import { z } from 'zod';

export const createAcademicFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }),
  }),
});

export const updateAcademicFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }),
  }),
});
