import express from 'express';
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

export const authRouter = router;
