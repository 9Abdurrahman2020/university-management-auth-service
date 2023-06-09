import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';

const generateIncrementUserId = async (): Promise<string> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  const incrementedUserId = (parseInt(lastUser?.id || '0') + 1)
    .toString()
    .padStart(5, '0');
  return incrementedUserId;
};
const createUser = async (user: IUser): Promise<IUser> => {
  // set incremented userId
  user.id = await generateIncrementUserId();
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

export default {
  createUser,
};
