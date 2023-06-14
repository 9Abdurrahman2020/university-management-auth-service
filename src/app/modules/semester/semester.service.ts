import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { semesterTitleAndCodeMapper } from './semester.constant';
import { ISemester, ISemesterFilter } from './semester.interface';
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

const getAllSemester = async (
  paginationOptions: IPaginationOptions,
  filter: ISemesterFilter
): Promise<IGenericResponse<ISemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.paginationQueryHelper(paginationOptions);

  const sortOption: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOption[sortBy] = sortOrder;
  }

  const result = await Semester.find({})
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const total = await Semester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const semesterService = {
  createSemester,
  getAllSemester,
};
