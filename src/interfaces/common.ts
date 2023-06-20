import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    resultCount: number;
    total: number;
  };
  data: T;
};
export type IGender = 'male' | 'female' | 'other';
export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB-'
  | 'AB+'
  | 'O+'
  | 'O-';
