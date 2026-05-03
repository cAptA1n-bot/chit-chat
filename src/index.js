import 'dotenv/config';
import express from 'express';
import {connectPG} from './database/pg.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/users', authRouter)

const startServer = async () => {
  try {
    await connectPG();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}...`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();