import userModel from '../models/user.model.js';
import * as userService  from '../services/user.service.js';
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service.js';


export const createUserController = async (req, res) => { 
    console.log('Registration request body:', req.body);
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) { 
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
     }

     try {
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();

        delete user._doc.password;
        console.log('User registered successfully:', { email: user.email });
        res.status(201).json({ user, token });
        
     } catch (error) {
        console.error('Registration error:', error.message);
        res.status(400).send(error.message);
     }
}

export const loginController = async(req,res)=>{
   console.log('Login request body:', req.body);
   
   const errors = validationResult(req);

   if(!errors.isEmpty()){
      console.log('Login validation errors:', errors.array());
      return res.status(400).json({errors : errors.array()});
   }

   try {
      const { email, password } = req.body;

      const user = await userModel.findOne({email}).select('password email');

      if(!user){
         console.log('User not found:', email);
         return res.status(401).json({
            errors:'Invalid Credentials'
         });
      }

      console.log('User found, checking password');
      const isMatch = await user.isValidPassword(password);

      if(!isMatch){
         console.log('Password does not match');
         return res.status(400).json({errors:'Invalid Credentials'});
      }

      console.log('Password matched, generating token');
      const token = await user.generateJWT();
      console.log('Login successful for:', email);
      console.log('Generated token:', token);
      res.status(200).json({user, token});
   } catch (error) {
      console.error('Login error:', error.message);
      res.status(400).send(error.message);
   }
}
// this controller should work for only one authenticated user 
export const profileController = async(req,res)=>{
    // console.log(req.user);
     res.status(200).json({
      user: req.user
     });
}

export const logoutController = async(req,res)=>{
   try {
      const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
      redisClient.set(token ,'logout','EX',60*60*24);
      // we stored the token on redis as it will deleted after 24 hours itself
      res.status(200).json({
         message: 'Logged out successfully'
      })
   } catch (error) {
      res.status(500).send(error.message);
   }
}

export const getAllUsersController = async(req,res)=>{
   try {
      const loggedInUser  = await userModel.findOne({email:req.user.email});
      const allUsers = await userService.getAllusers({userId:loggedInUser._id});
      return res.status(200).json({
         users:allUsers
      })
   } catch (err) {
       console.log(err);
       return res.status(400).json(err)
   }
}
