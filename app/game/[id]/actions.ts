"use server";

import { dbConnect } from "@/lib/db";
import { Game } from "@/models/Game";
import { revalidatePath } from "next/cache";

export async function createComment(content: string, name: string, gameID: number, userID = crypto.randomUUID()) {
  try {
    await dbConnect();
    const newComment = { userID: userID, userName: name, content: content };
    const existingGame = await Game.findOne({ gameID });
    const newComments = [...existingGame.comments, newComment];
    await Game.findOneAndUpdate({ gameID }, { comments: newComments });
    revalidatePath(`/game/${gameID}`);
  } catch (err) {
    console.error(err);
  }
}
