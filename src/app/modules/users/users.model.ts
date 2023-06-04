import { Model, Schema, model } from 'mongoose';
import { IUser } from './users.interface';

type UserModel = Model<IUser, object>;

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
