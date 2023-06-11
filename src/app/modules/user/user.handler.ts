import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { userServices } from './user.service';

const createUserHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await userServices.createUser(data);
  const responseData = {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'successfully created user',
    data: result,
  };
  sendResponse(res, responseData);
});

export const userHandler = {
  createUserHandler,
};
