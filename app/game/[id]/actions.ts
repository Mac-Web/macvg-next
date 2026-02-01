"use server";

import type { CommentType } from "@/types/Game";
import { dbConnect } from "@/lib/db";
import { Game } from "@/models/Game";
import { revalidatePath } from "next/cache";

type NewCommentType = {
  userName: string;
  content: string;
  userID?: string;
  date: Date;
};

export async function createComment(content: string, name: string, gameID: number, userID?: string) {
  try {
    await dbConnect();
    const newComment: NewCommentType = { userName: name, content: content, date: new Date() };
    if (userID) newComment.userID = userID;
    const existingGame = await Game.findOne({ gameID });
    const newComments = [...existingGame.comments, newComment];
    await Game.findOneAndUpdate({ gameID }, { comments: newComments });
    revalidatePath(`/game/${gameID}`);
  } catch (err) {
    console.error(err);
  }
}

export async function likeComment(liking: boolean, name: string, id: string, gameID: number) {
  try {
    await dbConnect();
    const existingGame = await Game.findOne({ gameID });
    const existingComments = [...existingGame.comments];
    const newComments = existingComments.map((comment: CommentType) => {
      if (comment._id.toString() === id) {
        if (liking) {
          comment.likes.push(name);
        } else {
          comment.likes = comment.likes.filter((like) => like !== name);
        }
      }
      return comment;
    });
    await Game.findOneAndUpdate({ gameID }, { comments: newComments });
  } catch (err) {
    console.error(err);
  }
}
