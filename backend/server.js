import http from 'http';
import app from './app.js';
import 'dotenv/config';
import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: '*',
    }
})

 io.use(async (socket,next) =>
{
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Invalid projectId'));
        }

        socket.project  = await projectModel.findById(projectId)

        if(!token){
            return next(new Error('Authentocation Error'))
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded){
            return next(new Error('Authentocation Error'))
        }
        socket.user = decoded;// did an error here socket.user=user 
        next()
    } catch (error) {
        next(error)
    }
})

    

io.on('connection', socket => {
  console.log('a user connected')

  socket.join(socket.project._id);

  socket.on('project-message',data=>{
    console.log(data);
    socket.broadcast.to(socket.project._id).emit('project-message',data);
  }
    ) 
  socket.on('event', data => { /* … */ });
  socket.on('disconnect', () => { /* … */ });
});



 const port  = process.env.PORT || 3123;
server.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})
