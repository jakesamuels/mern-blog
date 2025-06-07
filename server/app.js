import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitizer from "perfect-express-sanitizer";
import hpp from "hpp";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json());

// Data sanitization against NoSql query injection and XSS
app.use(
  sanitizer.clean({
    xss: true,
    noSql: true,
    noSqlLevel: 5,
    sanitizeKeys: true,
  })
);

// Prevent parameter pollution
app.use(hpp()); /* ADD WHITE LIST Obj */

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.all("/{*splat}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 400));
});

app.use(globalErrorHandler);

export default app;
