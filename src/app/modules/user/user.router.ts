import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { userHandler } from './user.handler';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentUserZodSchema),
  userHandler.createStudentUserHandler
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyUserZodSchema),
  userHandler.createFacultyUserHandler
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminUserZodSchema),
  userHandler.createAdminUserHandler
);

export const userRoute = router;
