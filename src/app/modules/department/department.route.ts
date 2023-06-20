import Express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { departmentHandler } from './department.handle';
import {
  createDepartmentZodValidation,
  updateDepartmentZodValidation,
} from './department.validation';
const router = Express.Router();

router.post(
  '/create-department',
  validateRequest(createDepartmentZodValidation),
  departmentHandler.createDepartment
);
router.get('/:id', departmentHandler.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(updateDepartmentZodValidation),
  departmentHandler.updateDepartment
);
router.delete('/:id', departmentHandler.deleteDepartment);
router.get('/', departmentHandler.getAllDepartments);

export const departmentRouter = router
