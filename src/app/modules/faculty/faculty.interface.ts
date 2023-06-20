import { Model, Types } from "mongoose";
import { IBloodGroup, IGender } from "../../../interfaces/common";

export type IFacultyFilters = {
    searchTerm: string;
  };
export type IFaculty = {
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
    academicDepartment: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    designation: string;
    profileImage: string;
}
export type FacultyModel = Model<IFaculty>;