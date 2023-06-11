import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterHandlers } from './semester.handler';
import { createSemesterZodValidation } from './semester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createSemesterZodValidation),
  semesterHandlers.handleCreateSemester
);

export const semesterRoute = {
  router,
};
