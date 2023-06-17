import Express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { facultyHandler } from './faculty.handler';
import { createFacultyZodValidation, updateFacultyZodValidation } from './faculty.validation';
const router = Express.Router();

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodValidation),
  facultyHandler.createFaculty
);
router.get('/:id', facultyHandler.getSingleFaculty);
router.patch('/:id',validateRequest(updateFacultyZodValidation), facultyHandler.updateFaculty);
router.delete('/:id', facultyHandler.deleteFaculty);
router.get('/', facultyHandler.getAllFaculties);

export const facultyRouter = {
  router,
};
