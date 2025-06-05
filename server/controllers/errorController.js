import { devError, prodError } from "./../utils/envError.js";
import AppError from "../utils/appError.js";

// Cast Error Handler
const castErrorHandler = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// Duplicate Error Handler
const duplicateErrorHandler = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `field value: ${value} already exists. please use another`;
  return new AppError(message, 400);
};

// Validation Error Handler
const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// JsonWebTokenError Handler
const handleJWTError = (err) =>
  new AppError("Invalid token. Please log in again", 401);

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = castErrorHandler(err);
    if (err.code === 11000) err = duplicateErrorHandler(err); // Corrected: Check err.code
    if (err.name === "ValidationError") err = validationErrorHandler(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError(err);
    prodError(err, res);
  }
};

export default globalErrorHandler;
