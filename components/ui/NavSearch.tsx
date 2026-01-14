"use client";

import { GameType } from "@/types/Game";
import { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import GameCard from "./GameCard";
import Image from "next/image";

function NavSearch() {
  const [games, setGames] = useState<GameType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const displayed = useMemo<GameType[]>(() => {
    return games.filter((game) => game.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()));
  }, [games, search]);
  const searchGamesRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchGames() {
      const games = await fetch("/games.json");
      const result = await games.json();
      setGames(result.games);
    }
    fetchGames();
    const clickHandler = (e: Event) => {
      if (!searchGamesRef?.current?.contains(e.target as Node)) {
        setSearching(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  useEffect(() => {
    setSearching(false);
    setSearch("");
  }, [pathname]);

  useEffect(() => {
    setSearching(search.trim().length !== 0 && displayed.length > 0);
  }, [search, displayed]);

  function handleClear() {
    setSearch("");
    searchBarRef.current?.focus();
  }

  return (
    <div
      className={`flex-1 bg-gray-300 dark:bg-gray-900 ${searching ? "rounded-t" : "rounded"} mx-2 relative`}
      ref={searchGamesRef}
    >
      <div className="flex gap-x-2 items-center pr-2">
        <input
          type="text"
          className="w-full bg-transparent outline-none border-none text-black dark:text-white text-[18px] px-3 py-1.5"
          value={search}
          placeholder="Search 500+ games"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearching(search.trim().length !== 0 && displayed.length > 0)}
          ref={searchBarRef}
        />
        {search.length > 0 && (
          <div
            className="flex items-center justify-center hover:bg-gray-300 hover:dark:bg-gray-800 rounded cursor-pointer 
                  duration-300 w-7.5 h-7.5"
            title="Clear search"
            onClick={handleClear}
          >
            <Image className="invert dark:invert-0" src="/icons/ui/close.svg" alt="Clear search" width={15} height={15} />
          </div>
        )}
      </div>
      {searching && (
        <div className="flex gap-3 flex-wrap absolute top-full p-3 bg-gray-300 dark:bg-gray-900 rounded-b w-full">
          {displayed.slice(0, 8).map((game) => (
            <GameCard key={game.id} game={game} search={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NavSearch;
