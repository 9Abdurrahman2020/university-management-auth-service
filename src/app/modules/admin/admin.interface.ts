import { Model, Types } from 'mongoose';
import { IBloodGroup, IGender } from '../../../interfaces/common';

export type IAdminFilters = {
  searchTerm: string;
};
export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: IGender;
  dateOfBirth: string;
  bloodGroup: IBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  department: Types.ObjectId;
  designation: string;
  profileImage: string;
};
export type AdminModel = Model<IAdmin>;
