import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { departmentFilterFields } from './department.constants';
import { IDepartmentFilters } from './department.interface';
import { departmentService } from './department.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const departmentData = req.body;
  const result = await departmentService.createDepartment(departmentData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Department created successfylly',
    data: result,
  });
});
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filter = pick(req.query, departmentFilterFields);
  const result = await departmentService.getAllDepartments(
    paginationOptions,
    filter as IDepartmentFilters
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived departments',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentService.getSingleDepartment(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived department',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await departmentService.updateDepartment(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully updated department',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully deleted department',
    data: result,
  });
});

export const departmentHandler = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
