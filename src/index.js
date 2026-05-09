import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import {connectPG} from './database/pg.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import connectMongo from './database/mongo.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("connection established");
})

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/chat', messageRouter); 

const startServer = async () => {
  try {
    await connectPG();
    await connectMongo();
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}...`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();