import catchAsync from "./../utils/catchAsync.js";
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
