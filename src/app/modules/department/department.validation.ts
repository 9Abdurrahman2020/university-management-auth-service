import { z } from 'zod';

export const createDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is needed' }),
    faculty: z.string({ required_error: 'Faculty id is needed' }),
  }),
});

export const updateDepartmentZodValidation = z.object({
  body: z.object({
    title: z.string({required_error: "Title is needed"}).optional(),
    faculty: z.string({required_error: "Faculty id is needed"}).optional()
  })
})