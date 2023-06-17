import { z } from 'zod';
import {
  semesterCodes,
  semesterMonths,
  semesterTitles,
} from './semester.constant';

export const createSemesterZodValidation = z.object({
  body: z.object({
    title: z.enum([...semesterTitles] as [string, ...string[]], {
      required_error: 'semester title is needed',
    }),
    year: z.number({ required_error: 'semester year is needed' }),
    code: z.enum([...semesterCodes] as [string, ...string[]], {
      required_error: 'semester code is needed',
    }),
    startMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: 'start month is needed',
    }),
    endMonth: z.enum([...semesterMonths] as [string, ...string[]], {
      required_error: ' month is needed',
    }),
  }),
});

export const updateSemesterZodValidation = z.object({
  body: z
    .object({
      title: z
        .enum([...semesterTitles] as [string, ...string[]], {
          required_error: 'Semester title is needed',
        })
        .optional(),
      year: z.number({ required_error: 'Semester title is needed' }).optional(),
      code: z
        .enum([...semesterCodes] as [string, ...string[]], {
          required_error: 'semester code is needed',
        })
        .optional(),
      startMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: 'start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...semesterMonths] as [string, ...string[]], {
          required_error: ' month is needed',
        })
        .optional(),
    })
    .refine(body => (body.title && body.code) || (!body.title && !body.code), {
      message: 'Title and code both needed if you want to change title or code',
    }),
});
