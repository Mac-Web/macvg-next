import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const GameSchema = new Schema({
  gameID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
});

export const Game = models.Game || model("Game", GameSchema);
