import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv'
dotenv.config();
import helmet from 'helmet';
import './environment';
import mongoose from 'mongoose'
import connectDB from './config/connectDb';
import router from './routes/router';
import corsMiddleware from './config/corsMiddleware';
const app: Application = express();
const http = require('http');
const server = http.createServer(app);
import connectSocket from './config/socketConnection';


const PORT = process.env.PORT; 
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(corsMiddleware);
const socketIoConn = connectSocket(server);

  
app.use('/',router)

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
