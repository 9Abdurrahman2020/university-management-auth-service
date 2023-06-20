import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { adminHandler } from './admin.handler';
import { adminValidation } from './admin.validation';
const router = express.Router();

router.get('/:id', adminHandler.getSingleAdmin)
router.patch('/:id',validateRequest(adminValidation.adminUpdateZodValidation), adminHandler.updateAdmin)
router.get('/', adminHandler.getAllAdmin)

export const adminRouter = router;