import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleCastError = (
  error: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errorMessage: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage,
  };
};
export default handleCastError;
