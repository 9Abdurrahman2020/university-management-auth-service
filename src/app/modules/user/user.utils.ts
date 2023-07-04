/* eslint-disable no-undefined */
import { ISemester } from '../semester/semester.interface';
import { User } from './user.model';

const lastStudentId = async () => {
  const lastUser = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastUser?.id ? lastUser.id.substring(4) : undefined;
};

const generateIncrementStudentId = async (
  semester: ISemester | null
): Promise<string> => {
  const userId = await lastStudentId();

  let incrementedUserId = (parseInt(userId || '0') + 1)
    .toString()
    .padStart(5, '0');
  const lastTwoNumberOfYear = semester?.year?.toString().substring(2);

  incrementedUserId = `${lastTwoNumberOfYear}${semester?.code}${incrementedUserId}`;
  return incrementedUserId;
};

const lastFacultyId = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};
const generateIncrementFacultyId = async () => {
  const facultyId = await lastFacultyId();
  let incrementedUserId = (parseInt(facultyId || '0') + 1)
    .toString()
    .padStart(5, '0');

  incrementedUserId = `F-${incrementedUserId}`;
  return incrementedUserId;
};
const lastAdminId = async () => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};
const generateIncrementAdminId = async () => {
  const adminId = await lastAdminId();
  let incrementedUserId = (parseInt(adminId || '0') + 1)
    .toString()
    .padStart(5, '0');

  incrementedUserId = `A-${incrementedUserId}`;
  return incrementedUserId;
};

export const userUtils = {
  generateIncrementStudentId,
  generateIncrementFacultyId,
  generateIncrementAdminId,
};
