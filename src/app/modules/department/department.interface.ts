import { Model } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IDepartment = {
  title: string;
  academicFaculty: string | IAcademicFaculty;
};
export type IDepartmentFilters = {
  searchTerm: string;
};

export type DepartmentModel = Model<IDepartment, {}>;
