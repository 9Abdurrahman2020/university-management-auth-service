import { Model } from "mongoose";
import { IFaculty } from "../faculty/faculty.interface";

export type IDepartment = {
    title: string,
    faculty: string | IFaculty
}
export type IDepartmentFilters = {
    searchTerm: string;
  };

export type DepartmentModel = Model<IDepartment, {}>;