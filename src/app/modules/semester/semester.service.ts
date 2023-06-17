import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  semesterSearchableFields,
  semesterTitleAndCodeMapper,
} from './semester.constant';
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
  const { searchTerm, ...filterFields } = filter;
  const andConditions = [];
  // create searchable (partial match) queries for searching from db
  if (searchTerm) {
    andConditions.push({
      $or: semesterSearchableFields.map(field => {
        if (field == 'year') {
          return {
            $expr: {
              $regexMatch: {
                input: { $toString: { $toLong: '$year' } },
                regex: searchTerm,
              },
            },
          };
        } else {
          return {
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          };
        }
      }),
    });
  }
  // create filterable (full match) queries for filtering from db
  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //   $expr: {
  //     $regexMatch: {
  //       input: { $toString: { $toLong: '$year' } },
  //       regex: searchTerm,
  //     },
  //   },
  // };
  //     ]
  //   }
  // ]

  // so that mongoose won't give error when it's empty conditions
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortOption: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOption[sortBy] = sortOrder;
  }

  const result = await Semester.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await Semester.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await Semester.countDocuments();

  return {
    meta: {
      page,
      limit,
      resultCount,
      total,
    },
    data: result,
  };
};
const getSingleSemesterById = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findById(id);
  return result;
};
const updateSemester = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (payload.title && payload.code) {
    if (semesterTitleAndCodeMapper[payload.title] !== payload.code) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid semester code !');
    }
  }
  const result = await Semester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteSemester = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findByIdAndDelete(id);
  return result;
};

export const semesterService = {
  createSemester,
  getAllSemester,
  getSingleSemesterById,
  updateSemester,
  deleteSemester,
};
