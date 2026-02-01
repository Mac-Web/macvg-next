"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { Session } from "next-auth";

type LikeCommentProps = {
  session: Session | null;
  likes: string[];
  id: string;
  gameID: number;
  likeComment: (liking: boolean, name: string, id: string, gameID: number) => Promise<void>;
};

function LikeComment({ session, likes, id, gameID, likeComment }: LikeCommentProps) {
  const [liked, setLiked] = useState<boolean>(session?.user?.name ? likes.includes(session.user.name) : false);
  const [likeCount, setLikeCount] = useState<number>(likes.length);

  function handleLike() {
    if (session?.user?.name) {
      likeComment(!liked, session.user.name, id, gameID);
      if (liked) {
        setLikeCount((prev) => prev - 1);
      } else {
        setLikeCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } else {
      alert("Please sign in to MacVG first to like comments!");
    }
  }

  return (
    <div className="flex gap-x-2 items-center text-base">
      <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 1.1, y: -1 }} onClick={handleLike}>
        {liked ? (
          <FaHeart size={18} className="cursor-pointer text-red-500" title="Unlike comment" />
        ) : (
          <FaRegHeart size={18} className="cursor-pointer" title="Like comment" />
        )}
      </motion.div>
      {likeCount}
    </div>
  );
}

export default LikeComment;
