import 'dotenv/config';
import express from 'express';
import {connectPG} from './database/pg.js';
import { configDotenv } from 'dotenv';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world");
})

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