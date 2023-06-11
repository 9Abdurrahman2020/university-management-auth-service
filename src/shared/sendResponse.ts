import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

type IResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
};

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  const responseData = {
    success: data.success,
    message: data.message,
    data: data.data,
  };
  res.status(StatusCodes.OK).json(responseData);
};
