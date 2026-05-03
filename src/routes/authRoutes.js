import express from 'express';
import authControllers from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/signup', authControllers.signup);
authRouter.post('/login', authControllers.login);

export default authRouter;