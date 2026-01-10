"use client";

import { GameType } from "@/types/Game";
import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import GameCard from "@/components/ui/GameCard";

function HomeGames() {
  const [search, setSearch] = useState<string>("");
  const [games, setGames] = useState<GameType[]>([]);
  const displayed = useMemo(() => {
    return games
      .filter((game: GameType) => game.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [games, search]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGames() {
      const games = await fetch("/games.json");
      const result = await games.json();
      setGames(result.games);
    }
    fetchGames();
  }, []);

  function handleClear() {
    setSearch("");
    const inputElement = searchBarRef.current?.children[0] as HTMLInputElement;
    inputElement.focus();
  }

  return (
    <div className="flex flex-col items-center gap-y-10 pb-10">
      <div className="border-2 border-gray-400 dark:border-gray-700 rounded-lg w-1/2 flex items-center pr-2" ref={searchBarRef}>
        <Input placeholder="Search 500+ free online games" value={search} onchange={setSearch} />
        {search.length > 0 && (
          <div
            className="flex items-center justify-center hover:bg-gray-400 hover:dark:bg-gray-800 rounded cursor-pointer 
          duration-300 w-10 h-10"
            title="Clear search"
            onClick={handleClear}
          >
            <Image className="invert dark:invert-0" src="/icons/ui/close.svg" alt="Clear search" width={20} height={20} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {displayed.length > 0 ? (
          displayed.slice(0, 50).map((game: GameType) => {
            return <GameCard key={game.id} game={game} />;
          })
        ) : (
          <div>
            No games found. Request a game{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScE9-d6agIablAARRlwVDUAcL7N6V4AVR6-c33dhVPSaR45CA/viewform"
              target="_blank"
              className="underline"
            >
              here
            </a>
            !
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeGames;
