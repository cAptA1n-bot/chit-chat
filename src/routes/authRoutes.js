import express from 'express';
import authControllers from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/signup', authControllers.signup);