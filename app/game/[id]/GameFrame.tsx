"use client";

import { GameType } from "@/types/Game";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/ui/Modal";

const toolbarIconStyles = "w-5 duration-300 cursor-pointer invert dark:invert-0 hover:scale-120";

function GameFrame({ game }: { game: GameType }) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [shareModalOpen, setShareModalOpen] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  const gameFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreen = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };

    window.addEventListener("fullscreenchange", handleFullscreen);

    return () => {
      window.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  useEffect(() => {
    if (shareModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [shareModalOpen]);

  function handleShare() {
    setShareModalOpen(true);
    navigator.clipboard.writeText(window.location.href);
  }

  function handleFullscreen() {
    setIsFullscreen(!isFullscreen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      gameFrameRef.current?.requestFullscreen();
    }
  }

  return (
    <div
      className={`w-full flex flex-col justify-center mb-7 ${isFullscreen ? "" : "rounded-lg"} overflow-hidden`}
      ref={gameFrameRef}
    >
      <iframe
        className={`bg-gray-100 dark:bg-gray-900 m-0 p-0 w-full ${
          isFullscreen ? "h-[calc(100vh-45px)]" : "h-125"
        } border-0 m-0 p-0`}
        src={game.link}
        tabIndex={-1}
      ></iframe>
      <div className="bg-gray-300 dark:bg-gray-800 h-11 text-lg font-bold flex justify-between items-center px-7">
        <div className="text-black dark:text-white flex items-center gap-x-2">
          <Image src={game.link + game.thumb} alt="Game icon" width={40} height={40} className="bg-white rounded" />
          <h2>{game.name}</h2>
        </div>
        <div className="flex gap-x-7">
          <Image
            className={toolbarIconStyles}
            title="Favorite game"
            src={`/icons/game/star${favorited ? "red" : ""}.svg`}
            alt="Star icon"
            width={25}
            height={25}
            onClick={() => setFavorited(!favorited)}
          />
          <Image
            className={toolbarIconStyles}
            title="Share game"
            src="/icons/game/share.svg"
            alt="Share icon"
            width={25}
            height={25}
            onClick={handleShare}
          />
          {game.download && (
            <Image
              className={toolbarIconStyles}
              title="Download game"
              src="/icons/game/download.svg"
              alt="Downlaod icon"
              width={25}
              height={25}
              onClick={() => window.open(`https://macvg-games.github.io/zips/game${game.id}.zip`, "_blank")}
            />
          )}
          <Image
            className={toolbarIconStyles}
            title="Report issues"
            src="/icons/game/flag.svg"
            alt="Report icon"
            width={25}
            height={25}
            onClick={() => window.open("https://forms.gle/GuqaHAETBs4bJtsF6", "_blank")}
          />
          <Image
            className={toolbarIconStyles}
            title="Toggle fullscreen"
            src={`/icons/game/${isFullscreen ? "compress" : "expand"}.svg`}
            alt="Fullscreen icon"
            width={25}
            height={25}
            onClick={handleFullscreen}
          />
        </div>
      </div>
      <AnimatePresence>
        {shareModalOpen && (
          <Modal close={() => setShareModalOpen(false)}>
            <h2 className="text-black dark:text-white text-2xl text-center font-bold">Share Game</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Link copied! Send the game link to anyone via email, social media, or more to share the fun and enjoy the fun
              together!
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GameFrame;
