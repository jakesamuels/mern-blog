import express from "express";
import {
  registerUser,
  login,
  protect,
} from "./../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/", protect, getAllUsers);

export default router;
