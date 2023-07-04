import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helper/jwtHelper';
import { User } from '../modules/user/user.model';

const authGaurd =
  (...roles: string[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Didn't provide token");
      }
      const verifyUser = jwtHelper.verifyToken(
        token,
        config.jwt.secret as string
      );
      if (!verifyUser) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid token');
      }
      const { userId } = verifyUser;
      const isUseExist = await User.isUserExist(userId);
      if (!isUseExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not exist');
      }
      const { role } = isUseExist;
      if (roles.length && !roles.includes(role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Forbiden');
      }
      next();
    } catch (err) {
      next(err);
    }
  };

export default authGaurd;
