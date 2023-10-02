"use client";

import { useGlobalOfTheDay } from "@/lib/data/global";
import { useLocalGameOfTheDay } from "@/lib/data/local";
import { page } from "@d-exclaimation/next";
import { useEffect, useMemo, useState } from "react";
import RandomTextmoji from "../(components)/random-textmoji";

export default page(() => {
  const {
    data: goal,
    isLoading: isGoalLoading,
    error: globalError,
  } = useGlobalOfTheDay();
  const {
    data: game,
    isLoading: isGameLoading,
    error: localError,
  } = useLocalGameOfTheDay(goal);

  const [today, setToday] = useState(new Date());

  const isLoading = useMemo(
    () => isGoalLoading || isGameLoading,
    [isGameLoading, isGoalLoading]
  );
  const items = useMemo(
    () => goal?.items ?? game?.goal.items ?? [],
    [goal, game]
  );
  const difficulty = useMemo(() => goal?.difficulty ?? "easy", [goal]);
  const attempts = useMemo(() => {
    const existing = game?.attempts ?? [];
    const padding = Array.from({ length: 6 - existing.length }, () => []);
    return [...existing, ...padding];
  }, [items, game]);

  const lastAttemptIndex = useMemo(
    () => (game ? game.attempts.length - 1 : -1),
    [attempts]
  );

  useEffect(() => {
    setToday(new Date());
  }, [setToday]);

  if (globalError && !items.length) {
    return (
      <div className="flex flex-col w-full min-h-[100dvh] pb-2 animate-in slide-in-from-left-6">
        <div className="flex flex-col gap-1.5 pt-10 pb-8">
          <span className="text-neutral-800 dark:text-neutral-300 text-xs">
            Hi, player
          </span>
          <span className="text-black dark:text-white text-xl font-medium">
            Welcome back!
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4 w-[75%] mb-24">
            <RandomTextmoji message="Unable to load today's goal" />
          </div>
        </div>
      </div>
    );
  }

  if (localError) {
    return (
      <div className="flex flex-col w-full min-h-[100dvh] pb-2 animate-in slide-in-from-left-6">
        <div className="flex flex-col gap-1.5 pt-10 pb-8">
          <span className="text-neutral-800 dark:text-neutral-300 text-xs">
            Hi, player
          </span>
          <span className="text-black dark:text-white text-xl font-medium">
            Welcome back!
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4 w-[75%] mb-24">
            <RandomTextmoji
              message="Your browser is not supported, please try again on a different
              browser"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[100dvh] pb-2 animate-in slide-in-from-left-6">
      <div className="flex flex-col gap-1.5 pt-10 pb-8">
        <span className="text-neutral-800 dark:text-neutral-300 text-xs">
          Hi, player
        </span>
        <span className="text-black dark:text-white text-xl font-medium">
          Welcome back!
        </span>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center gap-2">
          {[0, 0.25, 0.5, 1].map((each, i) => (
            <div
              key={`loading-${i}`}
              className="w-3 h-3 rounded-full mt-4 bg-neutral-600 dark:bg-neutral-400 animate-bounce [animation-fill-mode:backwards] mb-20"
              style={{
                animationDelay: `${each}s`,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          {/* Game */}
          <div
            className={`flex flex-col w-full rounded-3xl border-2 py-5 px-3
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
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="rounded-full w-8 h-8 bg-slate-200 dark:bg-neutral-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 68 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={
                      difficulty === "easiest"
                        ? "fill-blue-600"
                        : difficulty === "easy"
                        ? "fill-purple-500"
                        : difficulty === "medium"
                        ? "fill-fuchsia-400"
                        : difficulty === "hard"
                        ? "fill-red-400"
                        : "fill-orange-500"
                    }
                    d="M28.6583 7.92915C29.5964 5.81875 32.4887 5.71321 33.622 7.61259L33.7858 7.92915L36.6802 14.4414C39.2107 20.1348 43.4174 24.9109 48.7268 28.1395L49.6219 28.6632L54.763 31.5548C56.564 32.568 56.664 35.073 55.0632 36.2517L54.763 36.4454L49.6219 39.3373C44.1916 42.3918 39.8324 47.0291 37.1174 52.6187L36.6802 53.559L33.7858 60.0712C32.8479 62.1816 29.9556 62.2871 28.8221 60.3878L28.6583 60.0712L25.764 53.559C23.2336 47.8656 19.0268 43.0894 13.7173 39.861L12.8222 39.3373L7.68107 36.4454C5.88022 35.4325 5.78015 32.9275 7.38093 31.7486L7.68107 31.5548L12.8222 28.6632C18.2526 25.6085 22.6119 20.9713 25.3269 15.3817L25.764 14.4414L28.6583 7.92915ZM54.0569 6.55862C55.4416 9.67473 57.7785 12.3062 60.763 13.985C61.208 14.2353 61.208 14.8761 60.763 15.1265C57.7785 16.8052 55.4416 19.4367 54.0569 22.5528C53.821 23.0835 53.0677 23.0835 52.8319 22.5528C51.4472 19.4367 49.1102 16.8052 46.1258 15.1265C45.6808 14.8761 45.6808 14.2353 46.1258 13.985C49.1102 12.3062 51.4472 9.67473 52.8319 6.55862C53.0677 6.02798 53.821 6.02798 54.0569 6.55862Z"
                  />
                </svg>
              </div>

              <span className="text-black dark:text-white font-medium">
                Today's goal
              </span>

              <div className="flex flex-col ml-auto">
                <span className="text-black dark:text-white font-semibold">
                  {today.getDate() < 10 ? "0" : ""}
                  {today.getDate()}
                </span>
                <span className="text-neutral-800 dark:text-neutral-300 leading-none text-[0.6rem]">
                  {today.toLocaleString("en-NZ", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Description */}
            <span className="mt-4 mx-2 font-medium text-black dark:text-white">
              {items.length} items • {difficulty} difficulty
            </span>

            {/* Wordle */}
            <div className="flex flex-col mt-6 w-full">
              <div className="flex flex-col w-full gap-2.5 mx-4 border-l border-neutral-300/50 dark:border-neutral-600/50">
                {attempts.map((attempt, i) => {
                  return (
                    <div
                      className="flex flex-row items-center gap-2.5 -translate-x-1"
                      key={`row-${i}`}
                    >
                      <div className="w-2 h-2 bg-black border-4 border-black dark:border-white rounded-full mr-3" />
                      {attempt.length
                        ? attempt.map(({ icon, kind }, j) => {
                            const color =
                              kind === "exact"
                                ? "bg-green-500/30"
                                : kind === "similar"
                                ? "bg-yellow-500/30"
                                : "bg-slate-500/10 dark:bg-slate-500/30";
                            return (
                              <div
                                className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center
                                data-[animate="true"]:animate-in data-[animate="true"]:duration-700 
                                data-[animate="true"]:fade-in-0 data-[animate="true"]:slide-in-from-top-3
                                data-[animate="true"]:fill-mode-backwards`}
                                key={`col-${icon}-${kind}-${j}`}
                                data-animate={i === lastAttemptIndex}
                                style={{
                                  animationDelay: `${j * 0.25}s`,
                                }}
                              >
                                <span>{icon}</span>
                              </div>
                            );
                          })
                        : items.map((_, j) => (
                            <div
                              className={`w-12 h-12 rounded-lg bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center`}
                              key={`col-${j}`}
                            ></div>
                          ))}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Winning photo */}
            <div className="relative flex items-center w-full mt-8 mb-3 px-4 gap-3 py-4">
              <div className="px-2 py-2 pb-6 bg-white shadow -rotate-2">
                {game?.winning ? (
                  <img className="w-32 h-32 object-cover" src={game.winning} />
                ) : (
                  <div className="w-32 h-32 bg-black" />
                )}
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-3">
                <span className="text-black dark:text-white text-sm max-w-[80%] text-center [text-wrap:balance]">
                  Snapped a winning picture!
                </span>
                <button className="min-w-[8rem] py-1 bg-neutral-400 dark:bg-neutral-600 dark:text-white rounded-full text-sm">
                  Share
                </button>
                <button className="min-w-[8rem] py-1 bg-neutral-950 dark:bg-neutral-50 text-neutral-100 dark:text-neutral-900 rounded-full text-sm">
                  Save photo
                </button>
              </div>
              {!game?.winning && (
                <div className="absolute inset-0 bg-[#EFEFEF]/90 dark:bg-[#202020]/90 backdrop-blur-lg flex flex-col items-center justify-center gap-2">
                  <RandomTextmoji message="No winning photo yet" />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
});
