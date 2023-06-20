import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { userServices } from './user.service';

const createStudentUserHandler = catchAsync(async (req, res) => {
  const { student, ...data } = req.body;
  const result = await userServices.createUserAndStudent(student, data);
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully created user',
    data: result,
  };
  sendResponse(res, responseData);
});
const createFacultyUserHandler = catchAsync(async (req, res) => {
  const { faculty, ...data } = req.body;
  const result = await userServices.createUserAndFaculty(faculty, data);
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully created user',
    data: result,
  };
  sendResponse(res, responseData);
});
const createAdminUserHandler = catchAsync(async (req, res) => {
  const { admin, ...data } = req.body;
  const result = await userServices.createUserAndAdmin(admin, data);
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully created user',
    data: result,
  };
  sendResponse(res, responseData);
});

export const userHandler = {
 createStudentUserHandler,
 createFacultyUserHandler,
 createAdminUserHandler
};
