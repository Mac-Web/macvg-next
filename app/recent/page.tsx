import type { Metadata } from "next";
import Hero from "@/components/layout/Hero";
import RecentGames from "./RecentGames";

export const metadata: Metadata = {
  title: "Recent Games | MacVG",
  description:
    "With the Recent tab, you can quickly access the games you've recently played, making it easy to jump right back and continue playing them without browsing through every game to find them!",
};

async function Page() {
  const games = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/games.json");
  const gamesData = await games.json();

  return (
    <div>
      <Hero
        title="Recent Games"
        description="With the Recent tab, you can quickly access the games you've recently played, making it easy to jump right back and continue playing them without browsing through every game to find them!"
      />
      <RecentGames games={gamesData.games} />
    </div>
  );
}

export default Page;
