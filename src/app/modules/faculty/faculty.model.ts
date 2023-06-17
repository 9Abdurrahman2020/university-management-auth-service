import { Schema, model } from 'mongoose';
import { FacultyModel, IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty, FacultyModel>({
  title: { type: String, required: true },
});

export const Faculty = model<IFaculty, FacultyModel>(
  'Faculties',
  facultySchema
);
