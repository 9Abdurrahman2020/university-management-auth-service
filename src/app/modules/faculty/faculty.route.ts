import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { facultyHandler } from './faculty.handler';
import { facultyValidation } from './faculty.validation';
const router = express.Router();

router.get('/:id', facultyHandler.getSingleFaculty)
router.patch('/:id',validateRequest(facultyValidation.facultyUpdateZodValidation), facultyHandler.updateFaculty)
router.get('/', facultyHandler.getAllFaculty)

export const facultyRouter = router;