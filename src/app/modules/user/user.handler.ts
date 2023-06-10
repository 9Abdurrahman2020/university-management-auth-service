import { RequestHandler } from 'express';
import { userServices } from './user.service';

const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userServices.createUser(data);
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

export const userHandler = {
  createUserHandler,
};
