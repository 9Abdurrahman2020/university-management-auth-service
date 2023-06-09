import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
// eslint-disable-next-line no-unused-vars
const handleValidationError: (
  // eslint-disable-next-line no-unused-vars
  err: mongoose.Error.ValidationError
) => IGenericErrorResponse = (err: mongoose.Error.ValidationError) => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(ele => {
    return {
      path: ele?.path,
      message: ele?.message,
    };
  });
  const statusCode = 400;
  const message = 'ValidationError';
  return {
    statusCode,
    message,
    errorMessage: errors,
  };
};
export default handleValidationError;
