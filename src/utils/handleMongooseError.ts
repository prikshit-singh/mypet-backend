import { Error as MongooseError } from 'mongoose';

export function handleMongooseError(error: any) {
  // Validation Errors
  if (error instanceof MongooseError.ValidationError) {
    const messages = Object.values(error.errors).map(err => err.message);
    return {
      statusCode: 400,
      message: 'Validation Error',
      errors: messages,
    };
  }

  // Duplicate Key Errors (e.g. unique email)
  if (error.code === 11000) {
    const fields = Object.keys(error.keyPattern || {});
    return {
      statusCode: 409,
      message: 'Duplicate field value entered',
      errors: fields.map(field => `Duplicate value for: ${field}`),
    };
  }

  // Cast Errors (invalid ObjectId, etc.)
  if (error instanceof MongooseError.CastError) {
    return {
      statusCode: 400,
      message: 'Invalid value provided',
      errors: [`Invalid ${error.path}: ${error.value}`],
    };
  }

  // Default (Unknown Errors)
  return {
    statusCode: 500,
    message: 'Something went wrong',
    errors: [error.message || 'Internal server error'],
  };
}
