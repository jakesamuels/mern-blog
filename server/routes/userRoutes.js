import express from "express";
import { registerUser, login } from "./../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/", getAllUsers);

export default router;
