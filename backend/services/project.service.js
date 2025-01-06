import mongoose from "mongoose";
import Project from "../models/project.model.js";

export const createProject = async ({ name, userId }) => {
    if (!name) {
        throw new Error('Name is required');
    }
    if (!userId) {
        throw new Error('UserId is required');
    }

    let project;
    try {
        project = await Project.create({
            name,
            users: [userId]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;
};

export const getAllProjectByUserId = async ({userId}) => {
    if (!userId) {
        throw new Error('UserId is required');
    }

    const projects = await Project.find({ users: userId });

    return projects;
}

export const addUsersToProject = async ({ projectId, users ,userId}) => {
    if (!projectId) {
        throw new Error('ProjectId is required');
    }
   if(!mongoose.Types.ObjectId.isValid(projectId)){
       throw new Error('ProjectId is not valid');
   }

   if(!users){
         throw new Error('Users are required');
   }

   const project = await Project.findOne({ _id: projectId , users:userId});

   if(!project){
       throw new Error('User does not have access to this project');
   }

   const updtaedProject = await Project.findOneAndUpdate( {
    _id: projectId
}, {
    $addToSet: {// add users with the help of this operator
      users: {
           $each: users//add users
      }
    }
},{
    new:true
})

return updtaedProject
   
}
export const getProjectById = async ({projectId}) => {
    if (!projectId) {
        throw new Error('ProjectId is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('ProjectId is not valid');
    }

    const project = await Project.findOne({ _id: projectId }).populate('users')

    if (!project) {
        throw new Error('Project not found');
    }

    return project;
}