import { mongoose, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works on CREATE and SAVE!
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // Only run this function is password was actual modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
