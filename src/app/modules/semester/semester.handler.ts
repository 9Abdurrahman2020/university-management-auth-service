import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { ISemester } from './semester.interface';
import { semesterService } from './semester.service';

const handleCreateSemester = catchAsync(async (req, res) => {
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
export const semesterHandlers = {
  handleCreateSemester,
};
