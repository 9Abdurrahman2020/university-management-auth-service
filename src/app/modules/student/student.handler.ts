import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { IStudent, IStudentFilters } from './student.interface';
import { studentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, studentFilterableFields);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );
  const result = await studentService.getAllStudents(
    paginationOptions,
    filter as IStudentFilters
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrived students',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudent(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Successfully retrive student',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const updateData: Partial<IStudent> = req.body;
  const result = await studentService.updateStudent(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Student update successfully',
    data: result,
  });
});

export const studentHandler = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
