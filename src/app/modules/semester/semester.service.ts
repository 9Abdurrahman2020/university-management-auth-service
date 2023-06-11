import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { semesterTitleAndCodeMapper } from './semester.constant';
import { ISemester } from './semester.interface';
import { Semester } from './semester.model';

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (semesterTitleAndCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code !');
  }
  const result = await Semester.create(payload);
  if (result) {
    return result;
  } else {
    throw new ApiError(500, 'Failed to create semester !');
  }
};
export const semesterService = {
  createSemester,
};
