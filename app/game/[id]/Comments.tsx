import type { CommentType } from "@/types/Game";
import { dbConnect } from "@/lib/db";
import { Game } from "@/models/Game";
import CommentField from "./CommentField";

const gameInfoSectionStyles =
  "bg-gray-300 dark:bg-gray-800 rounded py-4 px-7 text-gray-700 dark:text-gray-300 text-lg leading-7 flex flex-col gap-y-2";

async function Comments({ id }: { id: number }) {
  await dbConnect();
  const gameData = await Game.findOne({ gameID: id });

  return (
    <>
      <div className={gameInfoSectionStyles}>
        <h2 className="text-black dark:text-white font-bold text-xl">Comments ({gameData.comments.length})</h2>
        <div className="py-5 flex flex-col gap-y-3">
          {gameData.comments.length > 0 ? (
            gameData.comments.map((comment: CommentType) => {
              return (
                <div key={comment._id} className="bg-gray-200 dark:bg-gray-700 rounded py-4 px-6 flex flex-col gap-y-2">
                  <div className="text-base flex items-center">
                    <span className="text-black dark:text-white font-bold">{comment.userName}</span>
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-black dark:text-white">{comment.content}</div>
                </div>
              );
            })
          ) : (
            <div>No comments yet. Start the conversation!</div>
          )}
        </div>
      </div>
      <div className={gameInfoSectionStyles}>
        <h2 className="text-black dark:text-white font-bold text-xl">Create Comment</h2>
        <CommentField id={id} />
      </div>
    </>
  );
}

export default Comments;
