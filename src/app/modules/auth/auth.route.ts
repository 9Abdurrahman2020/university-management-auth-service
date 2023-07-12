import express from 'express';
import { ENUM_USER_ROLES } from '../../../enum/user.role';
import authGaurd from '../../middleware/authGaurd';
import { validateRequest } from '../../middleware/validateRequest';
import { authHandler } from './auth.handler';
import { authValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.validateLoginZodSchema),
  authHandler.handleLogin
);
router.get(
  '/refresh-token',
  validateRequest(authValidation.validateRefreshTokenZodsSchema),
  authHandler.handleRefreshToken
);
router.post('/change-password',validateRequest(authValidation.validateChangePasswordZodSchema), authGaurd(ENUM_USER_ROLES.SUPER_ADMIN,ENUM_USER_ROLES.ADMIN,ENUM_USER_ROLES.FACULTY,ENUM_USER_ROLES.STUDENT), authHandler.changePassword)

export const authRouter = router;
