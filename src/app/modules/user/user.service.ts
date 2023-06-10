import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { userUtils } from './user.utils';

const createUser = async (user: IUser): Promise<IUser> => {
  // set incremented userId
  user.id = await userUtils.generateIncrementUserId();
  // if no password give use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(500, 'Faild to create user !');
  }
  return createdUser;
};

export const userServices = {
  createUser,
};
