import { StatusCodes } from 'http-status-codes';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  semesterCodes,
  semesterMonths,
  semesterTitles,
} from './semester.constant';
import { ISemester, SemesterModel } from './semester.interface';

const semesterSchema = new Schema<ISemester, SemesterModel>(
  {
    title: { type: String, enum: semesterTitles, required: true },
    year: { type: Number, required: true },
    code: { type: String, enum: semesterCodes, required: true },
    startMonth: { type: String, enum: semesterMonths, required: true },
    endMonth: { type: String, enum: semesterMonths, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true} }
);

semesterSchema.pre('save', async function (next) {
  const isExist = await Semester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'semester already exist !');
  } else {
    next();
  }
});

export const Semester = model<ISemester, SemesterModel>(
  'Semester',
  semesterSchema
);
