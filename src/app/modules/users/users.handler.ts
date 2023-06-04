import { Request, Response } from 'express';
import usersService from './users.service';

const createUserHandler = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
    });
  }
};

export default {
  createUserHandler,
};
