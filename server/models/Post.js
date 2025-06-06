import { mongoose, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post must include a title"],
      trim: true,
      maxlength: [100, "Title can't exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Post must include content"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

PostSchema.index({ author: 1, createdAt: -1 });

PostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
  next();
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
