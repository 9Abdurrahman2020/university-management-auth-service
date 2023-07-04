import { z } from 'zod';

const validateLoginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const validateRefreshTokenZodsSchema = z.object({
  cookies: z.object({
    ums_refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const authValidation = {
  validateLoginZodSchema,
  validateRefreshTokenZodsSchema,
};
