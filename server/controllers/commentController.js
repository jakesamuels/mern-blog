import Comment from "./../models/Comment.js";
import Post from "./../models/Post.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

export const addComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { _id: authorId } = req.user;
  const { content } = req.body;

  if (!content) {
    return next(new AppError("Comment content is required", 400));
  }

  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError("No post found with this ID", 404));
  }

  const comment = await Comment.create({
    content,
    author: authorId,
    post: postId,
  });

  await Post.updateOne({ _id: postId }, { $push: { comments: comment._id } });

  res.status(201).json({
    status: "success",
    data: {
      comment,
    },
  });
});
