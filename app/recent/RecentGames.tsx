"use client";

import type { GameType } from "@/types/Game";
import { useMemo, useState } from "react";
import GameCard from "@/components/ui/GameCard";

function RecentGames({ games }: { games: GameType[] }) {
  const [recents, setRecents] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("macvg-recents")!) || [];
    } else {
      return [];
    }
  });
  const recentGames = useMemo<GameType[]>(() => {
    return recents.map((recent) => games.find((game) => game.id === recent)!).reverse();
  }, [games, recents]);

  function handleClear() {
    if (confirm("Are you sure you want to clear all your recent games? This action cannot be undone.")) {
      localStorage.removeItem("macvg-recents");
      setRecents([]);
    }
  }

  return (
    <>
      {recentGames.length > 0 && (
        <div className="text-center underline cursor-pointer mb-5" onClick={handleClear}>
          Clear recent games
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center">
        {recentGames.length > 0 ? (
          recentGames.map((game: GameType) => {
            return <GameCard key={game.id} game={game} />;
          })
        ) : (
          <div className="px-5 md:px-20 lg:px-[calc(50%-550px)] text-center">
            You haven&apos;t played any games on MacVG yet! Browse our collection of the best online games on the homepage or from
            the tabs above!
          </div>
        )}
      </div>
    </>
  );
}

export default RecentGames;
