import Hero from "@/components/layout/Hero";
import HomeGames from "./HomeGames";

export default function Home() {
  return (
    <div className="px-5 md:px-20 lg:px-[calc(50%-550px)]">
      <Hero
        title="Welcome to MacVG!"
        description="Fun, redefined: hundreds of free online games. Endless fun. Infinite possibilities."
      />
      <HomeGames />
    </div>
  );
}
