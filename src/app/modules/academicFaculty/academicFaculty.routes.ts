import Express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyHandler } from './academicFaculty.handler';
import {
  createAcademicFacultyZodValidation,
  updateAcademicFacultyZodValidation,
} from './academicFaculty.validation';
const router = Express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodValidation),
  academicFacultyHandler.createFaculty
);
router.get('/:id', academicFacultyHandler.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyZodValidation),
  academicFacultyHandler.updateFaculty
);
router.delete('/:id', academicFacultyHandler.deleteFaculty);
router.get('/', academicFacultyHandler.getAllFaculties);

export const academicFacultyRouter = router;
