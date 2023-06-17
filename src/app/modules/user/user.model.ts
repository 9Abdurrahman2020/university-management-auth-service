import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['Student', 'Faculty', 'Admin'],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
