import { mongoose, Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment must have content"],
      trim: true,
      minlength: [1, "Comment cannot be empty"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

CommentSchema.index({ post: 1, createdAt: -1 });
CommentSchema.index({ author: 1 });

CommentSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
