import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateUserRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req);
      next();
    } catch (err) {
      next(err);
    }
  };

export const validateRequest = {
  validateUserRequest,
};
