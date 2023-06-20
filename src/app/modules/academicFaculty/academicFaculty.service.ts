import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constants';
import { IAcademicFaculty, IAcademicFacultyFilters } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFaculty = async (payload: IAcademicFaculty): Promise<IAcademicFaculty> => {
  const newFaculty = new AcademicFaculty(payload);
  const result = await newFaculty.save();
  return result;
};
const getAllFaculties = async (
  paginationOptions: Partial<IPaginationOptions>,
  filter: IAcademicFacultyFilters
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
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
      $or: academicFacultySearchableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await AcademicFaculty.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await AcademicFaculty.find().countDocuments();
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
const getSingleFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const academicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
