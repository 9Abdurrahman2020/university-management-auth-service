/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { ENUM_USER_ROLES } from '../../../enum/user.role';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: {
      type: String,
      enum: ENUM_USER_ROLES,
      required: true,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// isUseExist static method
userSchema.statics.isUserExist = async function (id) {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );
};
// isPasswordMatched static mathod
userSchema.statics.isPasswordMatched = async function (
  plainTextPass,
  hashPass
) {
  return await bcrypt.compare(plainTextPass, hashPass);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
