import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { facultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, facultyFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );
  const result = await facultyService.getAllFaculty(
    paginationOptions,
    filter as IFacultyFilters
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived faculties',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrive faculty',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updateData: Partial<IFaculty> = req.body;
  const result = await facultyService.updateFaculty(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  });
});

export const facultyHandler = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
