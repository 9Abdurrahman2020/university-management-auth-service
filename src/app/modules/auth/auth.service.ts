import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helper/jwtHelper';
import { User } from '../user/user.model';
import {
  IChangePassData,
  ILoginData,
  ILoginServiceReturn,
  IRefreshTokenServiceReturn,
} from './auth.interface';

const login = async (payload: ILoginData): Promise<ILoginServiceReturn> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User doesn't exist !");
  }
  const {
    id: userId,
    password: userPassword,
    role,
    needPasswordChange,
  } = isUserExist;
  const isPasswordMatched =
    userPassword && (await User.isPasswordMatched(password, userPassword));

  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Wrong password input !');
  }
  // create access token
  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.secret_expire_in as string
  );
  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.secret_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (
  token: string
): Promise<IRefreshTokenServiceReturn> => {
  let isTokenVerified = null;
  try {
    isTokenVerified = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid refresh token');
  }
  const isUserExist = await User.isUserExist(isTokenVerified?.userId);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not exist !');
  }
  const newAccessToken = jwtHelper.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as string,
    '1d'
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (user: JwtPayload, payload: IChangePassData) => {
  const { newPassword, oldPassword } = payload;
  const isUserExist = await User.findOne({ id: user.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not exist');
  }
  const isPasswordMatched = await bcrypt.compare(
    oldPassword,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password didn't match");
  }
  isUserExist.password = newPassword;
  isUserExist.needPasswordChange = false;
  isUserExist.passwordChangedAt = new Date();
  await isUserExist.save();
  return true;
};

export const authService = {
  login,
  refreshToken,
  changePassword,
};
