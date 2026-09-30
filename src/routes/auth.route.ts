import express from 'express';
import { handleLoginUser, handleRegisterUser } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', handleRegisterUser)
authRouter.post('/login', handleLoginUser)


export default authRouter;