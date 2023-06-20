import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { departmentSearchableFields } from './department.constants';
import { IDepartment, IDepartmentFilters } from './department.interface';
import { Department } from './department.model';

const createDepartment = async (payload: IDepartment): Promise<IDepartment> => {
  const newFaculty = new Department(payload);
  const result = (await newFaculty.save()).populate('academicFaculty');
  return result;
};
const getAllDepartments = async (
  paginationOptions: Partial<IPaginationOptions>,
  filter: IDepartmentFilters
): Promise<IGenericResponse<IDepartment[]>> => {
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
      $or: departmentSearchableFields.map(field => ({
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

  const result = await Department.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await Department.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await Department.find().countDocuments();
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
const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id).populate('academicFaculty');
  return result;
};
const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('academicFaculty');
  return result;
};
const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id);
  return result;
};

export const departmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
