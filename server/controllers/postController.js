import mongoose from "mongoose";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";
import Post from "../models/Post.js";

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
