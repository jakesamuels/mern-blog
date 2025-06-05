import mongoose from "mongoose";
import "dotenv/config";

const DB = process.env.MONGO_URI;

export const connectDB = () => {
  mongoose
    .connect(DB)
    .then(() => console.log("DB Connected"))
    .catch((error) => console.error(error));

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
};
