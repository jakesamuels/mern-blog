import { mongoose, Schema } from "mongoose";
import Comment from "./Comment.js";
import { nanoid } from "nanoid";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post must include a title"],
      trim: true,
      maxlength: [100, "Title can't exceed 100 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: [true, "Post must include content"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    author: {
      id: { type: Schema.Types.ObjectId, ref: "User" },
      username: {
        type: String,
        required: true,
      },
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

PostSchema.index({ author: 1, createdAt: -1 });

PostSchema.pre("save", function (next) {
  // Only proceed if the title has been modified or if it's a new document
  if (this.isModified("title") || this.isNew) {
    // 1. Generate the base slug from the title using your provided logic
    let baseSlug = this.title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)+/g, ""); // Trim leading/trailing hyphens

    // 2. Generate a short, unique random string using nanoid
    // nanoid() by default generates a 21-character string.
    // You can specify a shorter length if you prefer, e.g., nanoid(8) for 8 characters.
    const randomSuffix = nanoid(8); // Generates a random string of 8 characters

    // 3. Append the random string to the base slug
    this.slug = `${baseSlug}-${randomSuffix}`;
  }

  next(); // Call next to proceed with the save operation
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
