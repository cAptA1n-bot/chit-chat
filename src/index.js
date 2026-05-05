import 'dotenv/config';
import express from 'express';
import {connectPG} from './database/pg.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import connectMongo from './database/mongo.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/messages', messageRouter);

const startServer = async () => {
  try {
    await connectPG();
    await connectMongo();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}...`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();