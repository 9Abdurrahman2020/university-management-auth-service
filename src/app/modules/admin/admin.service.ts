import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constants';
import { IAdmin, IAdminFilters } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdmin = async (
  paginationOptions: Partial<IPaginationOptions>,
  filter: IAdminFilters
): Promise<IGenericResponse<IAdmin[]>> => {
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
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereCondition)
    .populate('department')
    .sort(sortOption)
    .skip(skip)
    .limit(limit);
  const resultCount = await Admin.find(whereCondition)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .countDocuments();
  const total = await Admin.find().countDocuments();
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
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id }).populate('department');
  return result;
};
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const { name, ...adminData } = payload;
  const isExist = await Admin.findOne({ id });
  if (!isExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Admin not found');
  }
  const newFacultyData: Partial<IAdmin> = { ...adminData };
  // asign name field dynamically
  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>; // 'name.firstName' or 'middleName' or 'name.lastName'
      (newFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ id }, newFacultyData, {
    new: true,
  }).populate('department');
  return result;
};

export const adminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
};
