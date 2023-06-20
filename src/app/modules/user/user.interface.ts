import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
export type IUserRole = 'student' | 'faculty' | 'admin';

export type IUser = {
  id: string;
  password: string;
  role: IUserRole;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IStudent;
};
export type UserModel = Model<IUser, object>;
