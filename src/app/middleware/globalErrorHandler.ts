import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';
import { IGenericErrorMessage } from '../../interfaces/error';

const globalErrorHander = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessage: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessage = err.message ? [{ path: '', message: err.message }] : [];
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
    errorMessage = err.message ? [{ path: '', message: err.message }] : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    // eslint-disable-next-line no-undefined
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};
export default globalErrorHander;
