import projectModel from '../models/project.model.js';
import * as projectService from '../services/project.service.js';
import { validationResult } from 'express-validator';
import userModel from '../models/user.model.js';

export const createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body;

    //console.log('req.user:', req.user); 
    
    if (!req.user || !req.user.email) {
     // console.log('req.user:', req.user); // Debugging statement
      return res.status(401).json({ error: 'Unauthorized: No user information found' });
    }

    const loggedInUser = await userModel.findOne({ email: req.user.email });

    if (!loggedInUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = loggedInUser._id;

    const newProject = await projectService.createProject({ name, userId });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const allUserProjects = await projectService.getAllProjectByUserId({ userId: loggedInUser._id });

    return res.status(200).json({
      projects: allUserProjects
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
    
  }
}

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const {projectId, users} = req.body;
    const loggedInUser = await userModel.findOne({ email: req.user.email });

    const project = await projectService.addUsersToProject({ 
      projectId, 
      users, //users already have
      userId: loggedInUser._id });// new users

      return res.status(200).json({
        project
      });
  } catch (err) {
    console.error(err);
  }
}

export const getProjectById = async (req, res) => {

  const { projectId } = req.params;

  try {

      const project = await projectService.getProjectById({ projectId });

      return res.status(200).json({
          project
      })

  } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message })
  }

}

