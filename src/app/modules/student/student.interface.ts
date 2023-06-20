import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/common';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';
import { IDepartment } from '../department/department.interface';
import { ISemester } from '../semester/semester.interface';

export type IStudentFilters = {
  searchTerm: string;
};

export type IStudent = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: IGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: IBloodGroup;
  guardian: {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
  };
  localGuardian: {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
  };
  profileImage?: string;
  academicSemester: Types.ObjectId | ISemester;
  academicDepartment: Types.ObjectId | IDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};
export type StudentModel = Model<IStudent, {}>;
