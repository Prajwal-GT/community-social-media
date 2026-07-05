const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    video: { type: String, default: "" },
    feeling: { type: String, default: "" },

    username: { type: String, default: "Anonymous" },
    avatar: { type: String, default: "https://i.pravatar.cc/150" },

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },

    comments: [
      {
        username: String,
        text: String,
        parentId: { type: String, default: null },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);