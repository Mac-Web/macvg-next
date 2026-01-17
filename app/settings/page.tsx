import type { Metadata } from "next";
import { GameType } from "@/types/Game";
import Hero from "@/components/layout/Hero";
import ThemeDropdown from "./ThemeDropdown";
import AboutBlank from "./AboutBlank";
import Cloak from "./Cloak";
import Delete from "./Delete";

export const metadata: Metadata = {
  title: "Settings | MacVG",
  description:
    "Here, you can set a fully customized theme for a more personalized gaming experience, select a cloaker to change and customize the game site's tab name, and open different websites using our about:blank embedder!",
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
        title="Settings"
        description="Here, you can set a fully customized theme for a more personalized gaming experience, select a cloaker to change and customize the game site's tab name, and open different websites using our about:blank embedder!"
      />
      <div className="flex flex-col gap-y-10 items-center">
        <div className="flex flex-col items-center gap-y-7 w-full">
          <h2 className="text-black dark:text-white text-2xl font-bold">Themes</h2>
          <ThemeDropdown />
        </div>
        <Cloak />
        <AboutBlank />
        <Delete />
      </div>
    </div>
  );
}

export default Page;
