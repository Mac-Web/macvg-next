import { GameType } from "@/types/Game";
import Link from "next/link";

function GameCard({ game }: { game: GameType }) {
  return (
    <Link
      className="flex justify-center cursor-pointer items-end text-[14px] w-25.5 bg-center bg-gray-500 text-white px-2.5 font-bold
       border border-gray-400 dark:border-gray-800 no-underline text-center rounded-[5px] h-25.5 pb-2.5 bg-no-repeat
        bg-size-[100%] hover:bg-size-[110%] hover:-translate-y-1 hover:scale-105 scale-100 overflow-hidden relative duration-300"
      style={{
        backgroundImage: `linear-gradient(
          rgba(40, 40, 40, 0.2),
          rgba(20, 20, 20, 0.9)
          ),
          url("${game.link + game.thumb}")`,
      }}
      href={`/game/${game.id}`}
    >
      {game.name}
    </Link>
  );
}

export default GameCard;
