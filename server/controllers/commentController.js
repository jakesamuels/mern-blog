import Comment from "./../models/Comment.js";
import Post from "./../models/Post.js";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

// POST - addComment
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

// DELETE - deleteComment
export const deleteComment = catchAsync(async (req, res, next) => {
  const { postId, commentId } = req.params;
  const { _id: authorId } = req.user;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new AppError("No post found with this ID", 404));
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new AppError("No comment found with this ID", 404));
  }

  if (!comment.author.equals(authorId)) {
    return next(
      new AppError(
        "You do not have permission to delete this comment as you are not the author.",
        403
      )
    );
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    return next(
      new AppError("No comment found with this ID or already deleted.", 404)
    );
  }

  await Post.updateOne({ _id: postId }, { $pull: { comments: commentId } });

  res.status(204).send();
});
