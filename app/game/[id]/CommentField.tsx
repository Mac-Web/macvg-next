"use client";

import { useState } from "react";
import { createComment } from "./actions";
import PrimaryButton from "@/components/ui/PrimaryButton";

function CommentField({ id }: { id: number }) {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  async function handleComment() {
    if (content.trim().length > 0) {
      await createComment(content, name, id);
      setContent("");
    }
  }

  return (
    <div className="flex flex-col gap-y-3 items-end py-5">
      <input
        type="text"
        className="rounded bg-gray-200 dark:bg-gray-700 w-full outline-none py-2 px-4"
        placeholder="What's your name?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/*TODO: only show username input if not logged in*/}
      <textarea
        className="rounded bg-gray-200 dark:bg-gray-700 w-full outline-none py-2 px-4 resize-none h-30"
        placeholder="Your thoughts about this game"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <PrimaryButton text="Create comment" click={handleComment} />
    </div>
  );
}

export default CommentField;
