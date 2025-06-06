import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
} from "./../controllers/postController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, createPost);
router.get("/:id", getPost);

export default router;
