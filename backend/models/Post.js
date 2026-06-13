import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: {
      type: String,
      required: true,
    },
    author: mongoose.Schema.Types.ObjectId,
    category: {
      type: String,
      enum: ["general", "ideas", "success-stories", "help-needed"],
      default: "general",
    },
    likes: [mongoose.Schema.Types.ObjectId],
    comments: [
      {
        author: mongoose.Schema.Types.ObjectId,
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
