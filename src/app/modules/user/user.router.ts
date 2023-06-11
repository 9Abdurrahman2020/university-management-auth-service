import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { userHandler } from './user.handler';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/user-create',
  validateRequest(userValidation.createUserZodSchema),
  userHandler.createUserHandler
);

export const userRoute = { router };
