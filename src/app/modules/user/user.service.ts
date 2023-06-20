import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { Semester } from '../semester/semester.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { userUtils } from './user.utils';

const createUserAndStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // if no password give use default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set user role
  user.role = 'student';
  // get semester to generate id
  const semester = await Semester.findById(student.academicSemester);
  // creating a sessin with mongoose
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await userUtils.generateIncrementStudentId(semester);
    // set id to student and user
    student.id = id;
    user.id = id;
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }
    // set student _id into user to create reference of student into user
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    session.commitTransaction();
    session.endSession;
    let newUserData = null;
    newUserData = await User.findOne({ id: newUser[0].id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
    return newUserData;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const createUserAndFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // if no password give use default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set user role
  user.role = 'faculty';
  // creating a sessin with mongoose
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await userUtils.generateIncrementFacultyId();
    // set id to student and user
    faculty.id = id;
    user.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }
    // set faculty _id into user to create reference of faculty into user
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    session.commitTransaction();
    session.endSession;
    let newUserData = await User.findOne({ id: newUser[0].id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        }
      ],
    });
    return newUserData;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const createUserAndAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // if no password give use default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set user role
  user.role = 'admin';
  // creating a sessin with mongoose
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await userUtils.generateIncrementAdminId();
    // set id to student and user
    admin.id = id;
    user.id = id;
    const newAdmin = await Admin.create([admin], { session });
    if (!newAdmin.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    // set faculty _id into user to create reference of faculty into user
    user.admin = newAdmin[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    session.commitTransaction();
    session.endSession;
    let newUserData = await User.findOne({ id: newUser[0].id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'department',
        }
      ],
    });
    return newUserData;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userServices = {
  createUserAndStudent,
  createUserAndFaculty,
  createUserAndAdmin
};
