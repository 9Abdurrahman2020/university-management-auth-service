import { z } from 'zod';

export const createDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }),
    academicFaculty: z.string({ required_error: 'Academic Faculty id is needed' }),
  }),
});

export const updateDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }).optional(),
    academicFaculty: z.string({ required_error: 'Academic Faculty id is needed' }).optional(),
  }),
});
