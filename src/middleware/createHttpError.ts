export const createHttpError = (message: string, statusCode: number = 500) => {
    const error = new Error(message);
    (error as any).statusCode = statusCode;
    return error;
  };