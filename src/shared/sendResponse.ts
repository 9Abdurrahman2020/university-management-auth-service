import { Response } from 'express';

type IResponseData<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
};

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  const responseData: IResponseData<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  };
  res.status(data.statusCode).json(responseData);
};
