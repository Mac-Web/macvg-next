"use client";

import type { Session } from "next-auth";
import { useState } from "react";
import { createComment } from "./actions";
import PrimaryButton from "@/components/ui/PrimaryButton";

type CommentFieldProps = {
  id: number;
  session: Session | null;
};

function CommentField({ id, session }: CommentFieldProps) {
  const sessionUser = session?.user;
  const [name, setName] = useState<string>(sessionUser?.name || "");
  const [content, setContent] = useState<string>("");

  async function handleComment() {
    if (content.trim().length > 0 && name.trim().length > 0) {
      //TODO: show validation warning and stuff on frontend
      await createComment(content, name, id, (sessionUser?.email || sessionUser?.name)!);
      setContent("");
    }
  }

  return (
    <div className={`flex flex-col gap-y-3 items-end ${sessionUser?.name ? "py-0" : "py-5"}`}>
      {sessionUser?.name ? (
        <div className="self-start text-sm">Commenting as {sessionUser.name}</div>
      ) : (
        <input
          type="text"
          className="rounded bg-gray-200 dark:bg-gray-700 w-full outline-none py-2 px-4"
          placeholder="What's your name?"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
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
