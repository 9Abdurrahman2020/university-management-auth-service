import { z } from 'zod';

const validateLoginZodSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'ID is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const validateChangePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'New password is required' }),
  }).refine((data)=>data.newPassword!==data.oldPassword, {message:"Can't use same password for both"}),
});
const validateRefreshTokenZodsSchema = z.object({
  cookies: z.object({
    ums_refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const authValidation = {
  validateLoginZodSchema,
  validateRefreshTokenZodsSchema,
  validateChangePasswordZodSchema
};
