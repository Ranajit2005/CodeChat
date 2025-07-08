import express from 'express';
import { getCurrentUser, getOtherUser, updateProfile } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';


const userRouter = express.Router();

userRouter.get('/current',isAuth ,getCurrentUser);
userRouter.put('/updateProfile',isAuth,updateProfile);
userRouter.get('/otherUsers',isAuth, getOtherUser);

export default userRouter;