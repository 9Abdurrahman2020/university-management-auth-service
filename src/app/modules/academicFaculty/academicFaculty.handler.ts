import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { academicFacultyFilterFields } from './academicFaculty.constants';
import { IAcademicFacultyFilters } from './academicFaculty.interface';
import { academicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body;
  const result = await academicFacultyService.createFaculty(facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty created successfylly',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filter = pick(req.query, academicFacultyFilterFields);
  const result = await academicFacultyService.getAllFaculties(
    paginationOptions,
    filter as IAcademicFacultyFilters
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
  const result = await academicFacultyService.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived faculty',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await academicFacultyService.updateFaculty(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully deleted faculty',
    data: result,
  });
});

export const academicFacultyHandler = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
