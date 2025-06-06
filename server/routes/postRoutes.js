import express from "express";
import { getAllPosts, getPost } from "./../controllers/postController.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);

export default router;
