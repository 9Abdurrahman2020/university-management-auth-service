import { z } from 'zod';
import { bloodGroup, gender } from '../../../constants/human';

const adminUpdateZodValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
    profileImage: z.string().optional(),
  }),
  department: z.string().optional(),
  designation: z.string().optional(),
});

export const adminValidation = {
  adminUpdateZodValidation,
};
