import * as projectModel from '../models/project.model.js'
import * as projectService from '../services/project.service.js'
import {validationResult} from 'express-validator'
 export const createProject = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

   try {
     const { name } = req.body;
     const loggedInUser=await projectModel.findOne({email:req.user.email}); 
     const userId = loggedInUser._id;
 
     const newProject = await projectService.createProject({user,userId})
     res.status(201).json(newProject);
 }
   catch (err) {
    console.log(err);
    res.status(400).send(err.message);
   }
}