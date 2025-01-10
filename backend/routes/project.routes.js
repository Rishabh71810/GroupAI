import {Router} from 'express';
 import {body} from 'express-validator';
 import { authUser } from '../middlewares/auth.middleware.js';
 import * as projectController from '../controllers/project.controller.js';

 const router = Router();

 router.post('/create',authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
 )

 router.get('/all',authUser,projectController.getAllProject)

router.put('/add-user', 
   authUser, 
   body('projectId').isString().withMessage('Project ID is required and should be a string'),
   body('users').isArray({ min: 1 }).withMessage('Users should be a non-empty array').custom((users) => {
      return users.every(user => typeof user === 'string');
   }).withMessage('Each user should be a string'),
   projectController.addUserToProject
)

router.get('/get-project/:projectId',authUser,projectController.getProjectById)

 export default router;