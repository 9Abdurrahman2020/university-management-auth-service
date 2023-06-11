import { Model } from 'mongoose';

export type IUser = {
  id: string;
  password: string;
  role: 'Student' | 'Faculty' | 'Admin';
};
export type UserModel = Model<IUser, object>;
