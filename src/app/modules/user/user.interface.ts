/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
export type IUserRole = 'student' | 'faculty' | 'admin';

export type IUser = {
  id: string;
  password: string;
  role: IUserRole;
  needPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IStudent;
};

export type UserModel = {
  isUserExist: (
    id: string
  ) => Promise<Pick<
    IUser,
    'id' | 'password' | 'needPasswordChange' | 'role'
  > | null>;
  isPasswordMatched: (
    plainTextPass: string,
    hashPass: string
  ) => Promise<boolean>;
} & Model<IUser>;
