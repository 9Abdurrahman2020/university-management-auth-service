import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { studentHandler } from './student.handler';
import { studentValidation } from './studentValidation';
const router = express.Router();

router.get('/:id', studentHandler.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidation.studentUpdateZodValidation),
  studentHandler.updateStudent
);
router.get('/', studentHandler.getAllStudents);

export const studentRouter = router;
