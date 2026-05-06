import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import messageControllers from '../controllers/messageControllers.js';

const messageRouter = express.Router();

messageRouter.post('/', authMiddleware, messageControllers.sendMessage);
messageRouter.get('/:receiverid', authMiddleware, messageControllers.getMessages);

export default messageRouter;