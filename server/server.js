import "dotenv/config";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 4000;

let server;

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(PORT, () =>
      console.log(`Server listening on port ${PORT}`)
    );
  } catch (error) {
    console.error("Failed to connect to database: ", error);
    process.exit(1);
  }
};

startServer();
