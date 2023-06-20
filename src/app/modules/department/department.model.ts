import { Schema, Types, model } from 'mongoose';
import { DepartmentModel, IDepartment } from './department.interface';

const departmentSchema = new Schema<IDepartment, DepartmentModel>(
  {
    title: { type: String, required: true },
    academicFaculty: { type: Types.ObjectId, required: true, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  departmentSchema
);
