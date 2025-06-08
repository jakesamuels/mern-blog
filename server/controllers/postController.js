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
  const { _id: authorId, username } = req.user;
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
    author: { id: authorId, username },
  });

  res.status(201).json({
    status: "success",
    data: {
      post,
    },
  });
});

// PUT - updatePost
export const updatePost = catchAsync(async (req, res, next) => {
  const { id: postId } = req.params;
  const { _id: authorId } = req.user;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID.", 404));
  }

  if (!post.author.equals(authorId)) {
    return next(
      new AppError(
        "You do not have permission to update this post as you are not the author.",
        403
      )
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return next(new AppError("Post could not be updated.", 500));
  }

  res.status(200).json({
    status: "success",
    data: {
      post: updatedPost,
    },
  });
});

// DELETE - deletePost
export const deletePost = catchAsync(async (req, res, next) => {
  const { id: postId } = req.params;
  const { _id: authorId } = req.user;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("No post found with that ID.", 404));
  }

  if (!post.author.equals(authorId)) {
    return next(
      new AppError(
        "You do not have permission to delete this post as you are not the author.",
        403
      )
    );
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    return next(new AppError("Post could not be deleted.", 500)); // Internal Server Error
  }

  res.status(204).send();
});
