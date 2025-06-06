import express from "express";
import {
  addComment,
  deleteComment,
} from "./../controllers/commentController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router.route("/:postId/comment").post(protect, addComment);

router.route("/:postId/comment/:commentId").delete(protect, deleteComment);

export default router;
