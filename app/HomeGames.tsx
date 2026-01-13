"use client";

import { GameType } from "@/types/Game";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import GameCard from "@/components/ui/GameCard";
import Dropdown from "@/components/ui/Dropdown";

function HomeGames() {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [games, setGames] = useState<GameType[]>([]);
  const [displayedGames, setDisplayedGames] = useState<GameType[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("a");
  const [ascending, setAscending] = useState<boolean>(true);
  const [randomIndex, setSetRandomIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("macvg-favorites")!) || [];
    } else {
      return [];
    }
  });
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGames() {
      const games = await fetch("/games.json");
      const result = await games.json();
      setGames(result.games);
    }
    fetchGames();
  }, []);

  useEffect(() => {
    if (games.length > 0) setLoading(false);
  }, [games]);

  useEffect(() => {
    setDisplayedGames(
      games
        .filter((game: GameType) => game.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
    setAscending(true);
  }, [games, search]);

  useEffect(() => {
    switch (sortMethod) {
      case "a":
        setDisplayedGames([...displayedGames].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "c":
        setDisplayedGames([...displayedGames].sort((a, b) => a.category.localeCompare(b.category)));
        break;
      case "r":
        setDisplayedGames(
          [...displayedGames].sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
        );
        break;
    }
  }, [sortMethod]);

  function handleClear() {
    setSearch("");
    const inputElement = searchBarRef.current?.children[0] as HTMLInputElement;
    inputElement.focus();
  }

  function handleRandom() {
    setSetRandomIndex(Math.floor(Math.random() * games.length));
  }

  function handleClearFavorites() {
    if (confirm("Are you sure you want to remove all your favorited games? This action cannot be undone.")) {
      localStorage.removeItem("macvg-favorites");
      setFavorites([]);
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-10 pb-10">
      <div
        className="w-full md:w-[50%] border-2 border-gray-400 dark:border-gray-700 rounded-lg flex gap-x-2 items-center pr-2"
        ref={searchBarRef}
      >
        <Input placeholder="Search 500+ free online games" value={search} onchange={setSearch} />
        {search.length > 0 && (
          <div
            className="flex items-center justify-center hover:bg-gray-300 hover:dark:bg-gray-800 rounded cursor-pointer 
          duration-300 w-8.5 h-8.5"
            title="Clear search"
            onClick={handleClear}
          >
            <Image className="invert dark:invert-0" src="/icons/ui/close.svg" alt="Clear search" width={20} height={20} />
          </div>
        )}
        <div
          className="flex items-center justify-center hover:bg-gray-300 hover:dark:bg-gray-800 rounded cursor-pointer 
          duration-300 w-8.5 h-8.5"
          title="Random game"
          onClick={handleRandom}
        >
          <Image className="invert dark:invert-0" src="/icons/ui/random.svg" alt="Random game" width={20} height={20} />
        </div>
      </div>
      <div className="w-full lg:w-[50%] flex gap-x-5 justify-center">
        <Dropdown
          label="Sort By: Name"
          options={[
            { complete: "Sort By: Name", label: "Name", onClick: () => setSortMethod("a") },
            { complete: "Sort By: Category", label: "Category", onClick: () => setSortMethod("c") },
            { complete: "Sort By: Release", label: "Release", onClick: () => setSortMethod("r") },
          ]}
          search={search}
        />
        <Dropdown
          label={`Filter All (${games.length})`}
          options={[
            {
              complete: `Filter All (${games.length})`,
              label: `All (${games.length})`,
              onClick: () => setDisplayedGames(games),
            },
            {
              complete: `Featured Games (${games.filter((game) => game.featured).length})`,
              label: `Featured (${games.filter((game) => game.featured).length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.featured)),
            },
            {
              complete: `Action & Adventure (${games.filter((game) => game.category === "action").length})`,
              label: `Action (${games.filter((game) => game.category === "action").length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.category === "action")),
            },
            {
              complete: `Strategy & Puzzle (${games.filter((game) => game.category === "strategy").length})`,
              label: `Strategy (${games.filter((game) => game.category === "strategy").length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.category === "strategy")),
            },
            {
              complete: `Casual & Idle (${games.filter((game) => game.category === "casual").length})`,
              label: `Casual (${games.filter((game) => game.category === "casual").length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.category === "casual")),
            },
            {
              complete: `Driving & Sports (${games.filter((game) => game.category === "driving").length})`,
              label: `Driving (${games.filter((game) => game.category === "driving").length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.category === "driving")),
            },
            {
              complete: `Downloadable Games (${games.filter((game) => game.download).length})`,
              label: `Downloadable (${games.filter((game) => game.download).length})`,
              onClick: () => setDisplayedGames(games.filter((game) => game.download)),
            },
            //TODO: DRY derive this from array
          ]}
          search={search}
        />
        <button
          className="h-12 text-lg text-black dark:text-white font-bold cursor-pointer flex-col relative flex items-center justify-center bg-gray-300 dark:bg-gray-800 border-none rounded-lg px-4"
          onClick={() => {
            setDisplayedGames((c) => [...c].reverse());
            setAscending(!ascending);
          }}
          title="Change direction"
        >
          <Image
            src="/icons/ui/up.svg"
            alt="Change direction"
            width={20}
            height={20}
            className={`invert dark:invert-0 ${ascending ? "rotate-x-180" : ""} duration-300`}
          />
        </button>
      </div>
      {randomIndex && (
        <div className="flex flex-wrap gap-2 justify-center">
          <GameCard game={games[randomIndex]} />
        </div>
      )}

      {favorites?.length > 0 && !loading && (
        <div className="border-2 w-full border-gray-700 relative flex flex-col items-center py-2 px-7 gap-y-5 rounded">
          <h2 className="text-2xl text-center text-black dark:text-white font-bold ">Favorites</h2>
          <div
            className="w-10 h-10 absolute top-1 right-2 p-2.5 cursor-pointer rounded flex justify-center items-center hover:bg-gray-300 hover:dark:bg-gray-900 duration-300"
            title="Clear favorites"
            onClick={handleClearFavorites}
          >
            <Image src="/icons/ui/delete.svg" alt="Delete icon" width={25} height={25} className="invert dark:invert-0" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 pb-2">
            {favorites.map((favorite) => (
              <GameCard key={favorite} game={games.find((game) => game.id === favorite)!} />
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-center">
        {displayedGames.length > 0 ? (
          displayedGames.map((game: GameType) => {
            return <GameCard key={game.id} game={game} />;
          })
        ) : loading ? (
          <div>Loading...</div>
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
