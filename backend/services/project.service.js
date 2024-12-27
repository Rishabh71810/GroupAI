import * as projectModel from "../models/project.model.js";

export const createProject = async ({
    name,userId
})=>{
    if(!name){
        throw new Error('Name is required');
    }
    if(!userId){
        throw new Error('User is required');
    }

    const project = new projectModel({
        name,
        users:[userId]
    });

    return project;
}