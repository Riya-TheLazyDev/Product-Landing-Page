// Centralized error handling middleware

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    status: err.status || 500,
    message: err.message || 'Internal Server Error'
  };

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    error.status = 401;
    error.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    error.status = 401;
    error.message = 'Token expired';
  }

  // Validation Errors
  if (err.name === 'ValidationError') {
    error.status = 400;
    error.message = err.message;
  }

  // Database Errors
  if (err.code === 'ER_DUP_ENTRY') {
    error.status = 409;
    error.message = 'Duplicate entry';
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    error.status = 400;
    error.message = 'Referenced record does not exist';
  }

  // Multer Errors
  if (err.name === 'MulterError') {
    error.status = 400;
    error.message = err.message;
  }

  // Send error response
  res.status(error.status).json({
    status: 'error',
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Async handler wrapper to catch errors in async functions
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  asyncHandler,
  AppError
};
