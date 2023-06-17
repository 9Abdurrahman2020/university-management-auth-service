import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { semesterFilterableFields } from './semester.constant';
import { ISemester, ISemesterFilter } from './semester.interface';
import { semesterService } from './semester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await semesterService.createSemester(body);
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully created semester',
    data: result,
  };
  sendResponse<ISemester>(res, responseData);
});
const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, semesterFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await semesterService.getAllSemester(
    paginationOptions,
    filter as ISemesterFilter
  );
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully retrive semester',
    meta: result.meta,
    data: result.data,
  };
  sendResponse(res, responseData);
});
const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await semesterService.getSingleSemesterById(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrive semester',
    data: result,
  });
});
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updateData: Partial<ISemester> = req.body;
  const result = await semesterService.updateSemester(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester update successfully',
    data: result,
  });
});
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await semesterService.deleteSemester(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const semesterHandlers = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
