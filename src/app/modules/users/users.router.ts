import express from 'express';
import userHandler from './users.handler';
const router = express.Router();

router.post('/user-create', userHandler.createUserHandler);

export default router;
