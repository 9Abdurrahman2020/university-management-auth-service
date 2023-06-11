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
