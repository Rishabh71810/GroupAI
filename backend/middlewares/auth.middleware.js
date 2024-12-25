import jwt from 'jsonwebtoken';
import 'dotenv/config'
import redisClient from '../services/redis.service.js';
export const authUser = async(req,res,next)=>{
    try{
        const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
        if(!token){ 
            return res.status(401).json({error: 'No token, authorization denied'});
        }

        const isBlackListed = await redisClient.get(token);
        // if token is on redis means user is logged out
        if(isBlackListed){
            res.cookie('token','');
            return res.status(401).send({error:'still in redis'})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
catch(error){
    console.log(error);
    res.status(401).json({error: 'No token, authorization denied'});
}};