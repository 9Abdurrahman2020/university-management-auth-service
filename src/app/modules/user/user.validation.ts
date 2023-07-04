import { z } from 'zod';
import { bloodGroup, gender } from '../../../constants/human';

const createStudentUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is needed',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is needed' }),
      email: z.string({ required_error: 'Email is needed' }).email(),
      contactNo: z.string({ required_error: 'Contact No is needed' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is needed',
      }),
      presentAddress: z.string({ required_error: 'Presend address is needed' }),
      permanentAddress: z.string({
        required_error: 'Permanent address is needed',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is needed',
        })
        .optional(),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father name is needed' }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is needed',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact no is needed',
        }),
        motherName: z.string({ required_error: 'Mother name is needed' }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is needed',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no is needed',
        }),
        address: z.string({ required_error: 'Guardian address is needed' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local guardian name is needed' }),
        occupation: z.string({
          required_error: 'Local guardian occupation is needed',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact no is needed',
        }),
        address: z.string({
          required_error: 'Local guardian address is needed',
        }),
      }),
      profileImage: z
        .string({ required_error: 'Profile image url is needed' })
        .optional(),
      academicSemester: z.string({
        required_error: 'Academic Semiser id is needed',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department id is needed',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty id is needed',
      }),
    }),
  }),
});

const createFacultyUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is needed',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is needed' }),
      email: z.string({ required_error: 'Email is needed' }).email(),
      contactNo: z.string({ required_error: 'Contact No is needed' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is needed',
      }),
      presentAddress: z.string({ required_error: 'Presend address is needed' }),
      permanentAddress: z.string({
        required_error: 'Permanent address is needed',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is needed',
        })
        .optional(),
      profileImage: z
        .string({ required_error: 'Profile image url is needed' })
        .optional(),
      academicDepartment: z.string({
        required_error: 'Academic Department id is needed',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty id is needed',
      }),
      designation: z.string({ required_error: 'Designation is needed' }),
    }),
  }),
});
const createAdminUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is needed',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is needed' }),
      email: z.string({ required_error: 'Email is needed' }).email(),
      contactNo: z.string({ required_error: 'Contact No is needed' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact no is needed',
      }),
      presentAddress: z.string({ required_error: 'Presend address is needed' }),
      permanentAddress: z.string({
        required_error: 'Permanent address is needed',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood group is needed',
        })
        .optional(),
      profileImage: z
        .string({ required_error: 'Profile image url is needed' })
        .optional(),
      department: z.string({ required_error: 'Department id is needed' }),
      designation: z.string({ required_error: 'Designation is needed' }),
    }),
  }),
});

export const userValidation = {
  createStudentUserZodSchema,
  createFacultyUserZodSchema,
  createAdminUserZodSchema,
};
