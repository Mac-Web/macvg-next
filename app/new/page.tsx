import type { Metadata } from "next";
import { GameType } from "@/types/Game";
import Hero from "@/components/layout/Hero";
import GameCard from "@/components/ui/GameCard";

export const metadata: Metadata = {
  title: "New Games | MacVG",
  description:
    "On each seasonal update we add tons of new games to MacVG, and you can access the games added in the previous update here! Play and discover all the new awesome games directly from the New tab!",
};

async function Page() {
  const games = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/games.json");
  const gamesData = await games.json();
  const newGames = gamesData.games
    .filter((game: GameType) => game.new)
    .sort((a: GameType, b: GameType) => a.name.localeCompare(b.name));

  return (
    <div>
      <Hero
        title="New Games"
        description="On each seasonal update we add tons of new games to MacVG, and you can access the games added in the previous update here! Play and discover all the new awesome games directly from the New tab!"
      />
      <div className="flex flex-wrap gap-2 justify-center">
        {newGames.map((game: GameType) => {
          return <GameCard key={game.id} game={game} />;
        })}
      </div>
    </div>
  );
}

export default Page;
