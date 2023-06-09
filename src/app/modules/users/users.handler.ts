import { NextFunction, Request, Response } from 'express';
import usersService from './users.service';

const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  try {
    const result = await usersService.createUser(data);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'successfully created user',
        data: result,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  createUserHandler,
};
