import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constants';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { Faculty } from './faculty.model';

const createFaculty = async (payload: IFaculty): Promise<IFaculty> => {
  const newFaculty = new Faculty(payload);
  const result = await newFaculty.save();
  return result;
};
const getAllFaculties = async (
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
  if(searchTerm){
    andConditions.push({
        $or: facultySearchableFields.map(field=>({
            [field]: {
                $regex: searchTerm,
                $options: 'i'
            }
        }))
    })
  }
  // implimenting filter query
  if(Object.keys(filterFields).length){
    andConditions.push({
        $and: Object.entries(filterFields).map(([field, value])=>({
            [field]: value
        }))
    })
  }
  
  const whereCondition = andConditions.length>0? { $and: andConditions } : {} ;

  const result = await Faculty.find(whereCondition).sort(sortOption).skip(skip).limit(limit);
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
const getSingleFaculty = async (id: string): Promise<IFaculty | null> =>{
  const result = await Faculty.findById(id);
  return result;
}
const updateFaculty = async (id: string, payload: Partial<IFaculty>): Promise<IFaculty | null>=>{
  const result = await Faculty.findOneAndUpdate({_id: id}, payload, { new: true});
  return result;
}
const deleteFaculty = async (id: string): Promise<IFaculty | null> =>{
  const result = await Faculty.findByIdAndDelete(id);
  return result;
}

export const facultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty
};
