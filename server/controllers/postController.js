import mongoose from "mongoose";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import Post from "../models/Post.js";

// GET - getAllPosts
export const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .select("title content createdAt")
    .populate("author", "username");

  if (posts.length === 0) {
    return res.status(200).json({
      results: 0,
      message: "No posts found",
      data: {
        posts: [],
      },
    });
  }

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});

// GET - getPost
export const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid or missing post ID", 400));
  }

  const post = await Post.findById(id)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "username",
      },
    });

  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

// POST - createPost
export const createPost = catchAsync(async (req, res, next) => {
  const { _id: authorId } = req.user;
  const { title, content } = req.body;

  if (!authorId) {
    return next(new AppError("You are not logged in. Please log in.", 401));
  }

  if (!title) {
    return next(new AppError("Post title is required.", 400));
  }

  if (!content) {
    return next(new AppError("Post content is required.", 400));
  }

  const post = await Post.create({
    title,
    content,
    author: authorId,
  });

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
});
