import express from "express";
import cors from "cors";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 400));
});

app.use(globalErrorHandler);

export default app;
