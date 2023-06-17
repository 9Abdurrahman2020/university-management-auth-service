import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { sendResponse } from '../../../shared/sendResponse';
import { facultyFilterFields } from './faculty.constants';
import { IFacultyFilters } from './faculty.interface';
import { facultyService } from './faculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const facultyData = req.body;
  const result = await facultyService.createFaculty(facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty created successfylly',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filter = pick(req.query, facultyFilterFields);
  const result = await facultyService.getAllFaculties(
    paginationOptions,
    filter as IFacultyFilters
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Successfully retrived faculties",
    data: result.data,
    meta: result.meta
  })
});
const getSingleFaculty = catchAsync( async (req: Request, res: Response)=>{
  const id = req.params.id;
  const result = await facultyService.getSingleFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:"Successfully retrived faculty",
    data: result
  })
})
const updateFaculty = catchAsync( async (req: Request, res: Response)=>{
  const id = req.params.id;
  const updateData = req.body;
  const result = await facultyService.updateFaculty(id, updateData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message:"Successfully updated faculty",
    data: result
  })
})
const deleteFaculty = catchAsync( async (req: Request, res: Response)=>{
  const id = req.params.id;
  const result = await facultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "successfully deleted faculty",
    data: result
  })
})

export const facultyHandler = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
