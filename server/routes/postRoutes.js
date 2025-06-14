import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "./../controllers/postController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, createPost);
router
  .route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;
