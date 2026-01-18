"use server";

import { dbConnect } from "@/lib/db";
import { Game } from "@/models/Game";
import { revalidatePath } from "next/cache";

type NewCommentType = {
  userName: string;
  content: string;
  userID?: string;
};

export async function createComment(content: string, name: string, gameID: number, userID?: string) {
  try {
    await dbConnect();
    const newComment: NewCommentType = { userName: name, content: content };
    if (userID) newComment.userID = userID;
    const existingGame = await Game.findOne({ gameID });
    const newComments = [...existingGame.comments, newComment];
    await Game.findOneAndUpdate({ gameID }, { comments: newComments });
    revalidatePath(`/game/${gameID}`);
  } catch (err) {
    console.error(err);
  }
}
