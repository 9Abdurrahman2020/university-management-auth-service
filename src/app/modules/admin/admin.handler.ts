import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { adminFilterableFields } from './admin.constants';
import { IAdmin, IAdminFilters } from './admin.interface';
import { adminService } from './admin.service';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, adminFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );
  const result = await adminService.getAllAdmin(
    paginationOptions,
    filter as IAdminFilters
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived admins',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await adminService.getSingleAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrive admin',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updateData: Partial<IAdmin> = req.body;
  const result = await adminService.updateAdmin(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
});

export const adminHandler = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};
