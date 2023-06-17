import { z } from 'zod';

export const createFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }),
  }),
});

export const updateFacultyZodValidation = z.object({
  body: z.object({
    title: z.string({required_error: "Title is needed"})
  })
})