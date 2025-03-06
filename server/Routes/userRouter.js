import express from 'express';
import { SignUp , SignIn } from './userInfo.js';
const userRouter = express.Router();


userRouter.post("/register",SignUp)
userRouter.post("/login",SignIn)


export default userRouter; 