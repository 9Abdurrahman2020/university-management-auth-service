import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { semesterHandlers } from './semester.handler';
import {
  createSemesterZodValidation,
  updateSemesterZodValidation,
} from './semester.validation';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createSemesterZodValidation),
  semesterHandlers.createSemester
);
router.get('/:id', semesterHandlers.getSingleSemester);
router.patch(
  '/:id',
  validateRequest(updateSemesterZodValidation),
  semesterHandlers.updateSemester
);
router.delete('/:id', semesterHandlers.deleteSemester);
router.get('/', semesterHandlers.getAllSemester);

export const semesterRoute = router
