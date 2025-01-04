// we use services for database like we will write code of mongodb in this folder so that if we want to change the database we can easily change it
import userModel from '../models/user.model.js';

 export const createUser = async ({
    email,password
})=>{
    if(!email || !password){
        throw new Error("Email and password should be required");
    }


    const user = await userModel.create({
        email,
        password
    });
    return user;
}
export const getAllusers = async ({userId})=>{
    const users = await userModel.find({
        _id: {$ne : userId}
    });
    return users;
}
