import { notFound } from "next/navigation";
import { GameType } from "@/types/Game";
import GameFrame from "./GameFrame";
import Comments from "./Comments";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/games.json");
  const data = await res.json();
  const game = data.games.find((game: GameType) => game.id === Number(id));

  if (!game) {
    notFound();
  }

  return {
    title: `${game.name} | MacVG`,
    description: game.about.slice(0, 160),
    authors: [{ name: "MacWeb", url: "https://macweb-next.vercel.app" }],
    openGraph: {
      title: `${game.name} | MacVG`,
      description: game.about,
      url: "https://macvg-next.vercel.app/game/" + game.id,
      siteName: "MacVG",
      images: [
        {
          url: "/logo.png",
          width: 500,
          height: 500,
        },
        game.link + game.thumb,
      ],
      type: "website",
    },
  };
}

const gameInfoSectionStyles =
  "bg-gray-300 dark:bg-gray-800 rounded py-4 px-7 text-gray-700 dark:text-gray-300 text-lg leading-7 flex flex-col gap-y-2";

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const games = await fetch(process.env.NEXT_PUBLIC_ROOT_URL + "/games.json");
  const gamesData = await games.json();
  const game = gamesData.games.find((game: GameType) => game.id === Number(id));

  if (!game) notFound();

  function renderCategory(category: string) {
    switch (category) {
      case "strategy":
        return "Strategy and Puzzle";
      case "action":
        return "Action and Adventure";
      case "casual":
        return "Casual and Idle";
      case "driving":
        return "Driving and Sports";
      default:
        return "Other";
    }
  }

  return (
    <div className="px-5 md:px-20 lg:px-[calc(50%-550px)]">
      <div className="flex flex-col md:flex-row justify-center py-5 gap-x-7">
        <div className="flex-3 flex flex-col">
          {/*ad*/}
          <GameFrame game={game} />
          {/*ad */}
          <div className="flex flex-col gap-y-5">
            {!game.about.includes("Oops") && (
              <div className={gameInfoSectionStyles}>
                <h3 className="text-black dark:text-white font-bold text-xl">About</h3>
                <p>{game.about}</p>
              </div>
            )}
            {!game.controls.includes("Still working on this one O_O") && (
              <div className={gameInfoSectionStyles}>
                <h3 className="text-black dark:text-white font-bold text-xl">Controls</h3>
                <ul className="list-inside list-[square]">
                  {game.controls.map((control: string, index: number) => (
                    <li key={index}>{control}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className={gameInfoSectionStyles}>
              <h3 className="text-black dark:text-white font-bold text-xl">Game Information</h3>
              <ul className="list-inside list-[square]">
                <li>Developer: {game.dev}</li>
                <li>Category: {renderCategory(game.category)}</li>
                <li>Genre: {game.genre}</li>
                <li>Players: {game.popularity}</li>
                <li>Release Date: {game.releaseDate}</li>
                <li>Build: {game.build}</li>
              </ul>
            </div>
            <Comments id={game.id} />
            {/*ad*/}
          </div>
        </div>
        <div className="flex-1">{/*ad */}</div>
      </div>
    </div>
  );
}

export default Page;
