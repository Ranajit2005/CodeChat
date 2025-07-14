import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import isAuth from '../middlewares/isAuth.js'


const messageRouter = express.Router();

messageRouter.post('/send/:receiver', isAuth, sendMessage);
messageRouter.get('/get/:receiver', isAuth, getMessages);

export default messageRouter;