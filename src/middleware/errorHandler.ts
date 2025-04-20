import { Request, Response, NextFunction } from 'express';
import { handleMongooseError } from '../utils/handleMongooseError';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mongooseError = handleMongooseError(err);
  res.status(mongooseError.status).json({
    status:mongooseError.status,
    success: false,
    message: mongooseError.message,
    errors: mongooseError.errors,
  });
};
