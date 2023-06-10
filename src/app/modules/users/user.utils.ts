import { User } from './user.model';

const generateIncrementUserId = async (): Promise<string> => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  const incrementedUserId = (parseInt(lastUser?.id || '0') + 1)
    .toString()
    .padStart(5, '0');
  return incrementedUserId;
};
export const userUtils = {
  generateIncrementUserId,
};
