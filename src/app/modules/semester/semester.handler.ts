import { StatusCodes } from 'http-status-codes';
import { paginationFields } from '../../../constants/pagination';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
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
const handleGetAllSemester = catchAsync(async (req, res) => {
  const filter: { searchTerm: string } = pick(req.query, ['searchTerm']);
  const paginationOptions: IPaginationOptions = pick(
    req.query,
    paginationFields
  );

  const result = await semesterService.getAllSemester(
    paginationOptions,
    filter
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

export const semesterHandlers = {
  handleCreateSemester,
  handleGetAllSemester,
};
