import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const getAllFaculty = async (
  paginationOptions: Partial<IPaginationOptions>,
  filter: IFacultyFilters
): Promise<IGenericResponse<IFaculty[]>> => {
  const { limit, page, sortBy, sortOrder, skip } =
    paginationHelper.paginationQueryHelper(paginationOptions);
  const { searchTerm, ...filterFields } = filter;
  const sortOption = {
    [sortBy]: sortOrder,
  };
  const andConditions = [];
  // implimenting search query
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // implimenting filter query
  if (Object.keys(filterFields).length) {
    andConditions.push({
      $and: Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereCondition)
    .populate(['academicDepartment', 'academicFaculty'])
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await Faculty.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await Faculty.find().countDocuments();
  return {
    data: result,
    meta: {
      limit,
      page,
      resultCount,
      total,
    },
  };
};
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id }).populate([
    'academicDepartment',
    'academicFaculty',
  ]);
  return result;
};
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const { name, ...facultyData } = payload;
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
  }
  const newFacultyData: Partial<IFaculty> = { ...facultyData };
  // asign name field dynamically
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>; // 'name.firstName' or 'middleName' or 'name.lastName'
      (newFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Faculty.findOneAndUpdate({ id: id }, newFacultyData, {
    new: true,
  }).populate(['academicDepartment', 'academicFaculty']);
  return result;
};

export const facultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
