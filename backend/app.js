import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js'; 
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/project.routes.js';
import cors from 'cors'

connect();



const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());// to parse cookies and read the contents of cookie used users/profile route
app.use(cors());


app.use('/users',userRoutes);
app.use('/projects',projectRoutes);
// we use cors because to let the websites use resources of this backend

app.get('/',(req,res)=>{
    res.send('Hello World');
})

export default app;