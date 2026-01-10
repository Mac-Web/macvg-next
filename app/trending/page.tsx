import type { Metadata } from "next";
import { GameType } from "@/types/Game";
import Hero from "@/components/layout/Hero";
import TrendingGame from "./TrendingGame";

export const metadata: Metadata = {
  title: "Trending Games | MacVG",
  description:
    "Here are the top 10 games on MacVG right now, sorted by total plays! View and play the most popular games everyone's playing, all easily through the Trending tab! (This list updates every season)",
};

async function Page() {
  const games = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/games.json");
  const gamesData = await games.json();
  const newGames = gamesData.games
    .filter((game: GameType) => game.trending)
    .sort((a: GameType, b: GameType) => b.trending! - a.trending!);

  return (
    <div>
      <Hero
        title="Trending Games"
        description="Here are the top 10 games on MacVG right now, sorted by total plays! View and play the most popular games everyone's playing, all easily through the Trending tab! (This list updates every season)"
      />
      <div className="flex flex-col gap-y-10 items-center">
        {newGames.map((game: GameType, i: number) => {
          return <TrendingGame key={game.id} game={game} i={i} />;
        })}
      </div>
    </div>
  );
}

export default Page;
