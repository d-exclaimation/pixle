"use client";

import RandomTextmoji from "@/app/(components)/random-textmoji";
import { useLocalAllGames } from "@/lib/data/local";
import { page } from "@d-exclaimation/next";
import Settings from "./settings";

export default page(() => {
  const { data, isLoading } = useLocalAllGames();
  return (
    <div className="flex flex-col w-full min-h-[100dvh] pb-2 animate-in slide-in-from-right-6">
      <div className="flex flex-col w-full items-start justify-start gap-2 px-3 pt-12 pb-2">
        <img
          className="w-16 h-16 rounded-full"
          src="https://api.dicebear.com/7.x/thumbs/svg?seed=Coco"
        />
        <div className="flex flex-col px-1 w-full">
          <span className="text-lg dark:text-white">Player (You)</span>
          <div className="flex items-center w-full">
            <span className="text-sm text-neutral-700 dark:text-neutral-400">
              @player
            </span>
            <Settings />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center gap-2">
          {[0, 0.25, 0.5, 1].map((each, i) => (
            <div
              key={`loading-${i}`}
              className="w-3 h-3 rounded-full mt-4 bg-neutral-700 dark:bg-neutral-400 animate-bounce [animation-fill-mode:backwards] mb-20"
              style={{
                animationDelay: `${each}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <div className="relative flex items-end justify-center gap-4 px-3 pt-4 pb-4">
            {[1, 3, 4, 2, 6, 4, 6, 10].map((each, i) => (
              <span
                key={`bar-${i}`}
                className="w-6 rounded bg-black dark:bg-white opacity-[0.025]"
                style={{ height: `${Math.round(each / 2)}rem` }}
              />
            ))}

            <div className="absolute inset-0 flex items-center justify-around gap-4 px-3 pt-12 pb-2">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg dark:text-white">
                  {data?.length ?? 0}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-400">
                  Games Played
                </span>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-lg dark:text-white">
                  {data?.filter(({ winning }) => winning)?.length ?? 0}
                </span>
                <span className="text-sm text-neutral-700 dark:text-neutral-400">
                  Games Won
                </span>
              </div>
            </div>
          </div>

          {data && data.length > 0 ? (
            <div className="grid w-full grid-cols-2 py-6 place-items-center place-content-center px-3">
              {data.map(
                ({ winning, attempts, goal: { difficulty, items } }, i) =>
                  winning ? (
                    <img
                      key={`attempt-${i}`}
                      className={`w-[calc(50vw-2rem)] h-[calc(50vw-2rem)] object-cover border max-w-[10rem] max-h-[10rem] rounded
                    ${
                      difficulty === "easiest"
                        ? "border-blue-600"
                        : difficulty === "easy"
                        ? "border-purple-500"
                        : difficulty === "medium"
                        ? "border-fuchsia-400"
                        : difficulty === "hard"
                        ? "border-red-400"
                        : "border-orange-500"
                    }`}
                      src={winning}
                    />
                  ) : (
                    <div
                      key={`attempt-${i}`}
                      className={`w-[calc(50vw-2rem)] h-[calc(50vw-2rem)] bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center border max-w-[10rem] max-h-[10rem] rounded
                    ${
                      difficulty === "easiest"
                        ? "border-blue-600"
                        : difficulty === "easy"
                        ? "border-purple-500"
                        : difficulty === "medium"
                        ? "border-fuchsia-400"
                        : difficulty === "hard"
                        ? "border-red-400"
                        : "border-orange-500"
                    }`}
                    >
                      <div className="flex flex-col shadow-md">
                        {attempts.map((attempt, j) => {
                          const row = attempt
                            .map(({ kind }) =>
                              kind === "exact"
                                ? "🟩"
                                : kind === "similar"
                                ? "🟨"
                                : "⬜"
                            )
                            .join("");

                          return (
                            <span
                              className="leading-none text-lg"
                              key={`attempt-${i}-${j}`}
                            >
                              {row}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="flex-1 w-full flex flex-col gap-1 items-center justify-center">
              <RandomTextmoji message="No games played" />
            </div>
          )}
        </>
      )}
    </div>
  );
});
