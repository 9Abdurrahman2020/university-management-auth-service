import express from 'express';
import { userHandler } from './user.handler';
const router = express.Router();

router.post('/user-create', userHandler.createUserHandler);

export const userRoute = { router };
