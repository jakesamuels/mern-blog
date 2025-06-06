import express from "express";
import { addComment } from "./../controllers/commentController.js";
import { protect } from "./../controllers/authController.js";

const router = express.Router();

router.route("/:postId/comments").post(protect, addComment);

export default router;
