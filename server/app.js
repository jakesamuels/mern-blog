import express from "express";
import cors from "cors";

import userRouter from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);

export default app;
