import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { studentSearchableFields } from './student.constants';
import { IStudent, IStudentFilters } from './student.interface';
import { Student } from './student.model';

const getAllStudents = async (
  paginationOptions: Partial<IPaginationOptions>,
  filter: IStudentFilters
): Promise<IGenericResponse<IStudent[]>> => {
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
      $or: studentSearchableFields.map(field => ({
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

  const result = await Student.find(whereCondition)
    .populate(['academicSemester', 'academicFaculty', 'academicDepartment'])
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await Student.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await Student.find().countDocuments();
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
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findOne({ id });
  return result;
};
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const { name, guardian, localGuardian, ...studentData } = payload;
  const isExist = await Student.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found');
  }
  const newStudentData: Partial<IStudent> = { ...studentData };
  // asign name field dynamically
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IStudent>; // 'name.firstName' or 'middleName' or 'name.lastName'
      (newStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  // asign guardian field dynamically
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // 'name.firstName' or 'middleName' or 'name.lastName'
      (newStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian];
    });
  }
  // asign localGuardian field dynamically
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey =
        `localGuardian.${key}` as keyof Partial<IStudent>; // 'name.firstName' or 'middleName' or 'name.lastName'
      (newStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await Student.findOneAndUpdate({ id: id }, newStudentData, {
    new: true,
  });
  return result;
};

export const studentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
};
