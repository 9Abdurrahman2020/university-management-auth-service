import express from 'express';
import { ENUM_USER_ROLES } from '../../../enum/user.role';
import authGaurd from '../../middleware/authGaurd';
import { validateRequest } from '../../middleware/validateRequest';
import { facultyHandler } from './faculty.handler';
import { facultyValidation } from './faculty.validation';
const router = express.Router();

router.get(
  '/:id',
  authGaurd(
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.FACULTY,
    ENUM_USER_ROLES.STUDENT
  ),
  facultyHandler.getSingleFaculty
);
router.patch(
  '/:id',
  authGaurd(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.FACULTY),
  validateRequest(facultyValidation.facultyUpdateZodValidation),
  facultyHandler.updateFaculty
);
router.get(
  '/',
  authGaurd(ENUM_USER_ROLES.ADMIN, ENUM_USER_ROLES.FACULTY),
  facultyHandler.getAllFaculty
);

export const facultyRouter = router;
