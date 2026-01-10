import { GameType } from "@/types/Game";
import GameCard from "@/components/ui/GameCard";

type TrendingGameProps = {
  game: GameType;
  i: number;
};

function TrendingGame({ game, i }: TrendingGameProps) {
  return (
    <div className="flex items-center gap-x-10">
      <div className="text-gray-800 dark:text-gray-300 text-center text-lg leading-10">
        <h3 className="text-black dark:text-white text-3xl font-bold">#{i + 1}</h3> {game.trending!.toLocaleString()} plays
      </div>
      <GameCard game={game} />
    </div>
  );
}

export default TrendingGame;
