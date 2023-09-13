import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { safeParseAsync } from "valibot";
import { Attempt, Game, Games, Goal } from "./common";
import { store } from "./idb";

export function useLocalAllGames() {
  return useQuery({
    queryKey: ["daily", "game", "all"],
    queryFn: async () => {
      const daily = await store("daily");
      const raw = await daily.getAll();
      const maybeGames = await safeParseAsync(Games, raw);
      if (maybeGames.success) {
        return maybeGames.output;
      }
      return [];
    },
  });
}

export function useLocalGameOfTheDay(goal: Goal | undefined) {
  return useQuery({
    queryKey: ["daily", "game", goal?.day],
    queryFn: async () => {
      if (!goal) {
        throw new Error("No goal provided");
      }
      const daily = await store("daily");
      const raw = await daily.get(goal.day);
      const maybeGame = await safeParseAsync(Game, raw);
      if (maybeGame.success) {
        return maybeGame.output;
      }

      const game = {
        attempts: [],
        day: goal.day,
        goal,
      } as Game;

      await daily.add(game);
      return game;
    },
    enabled: !!goal?.day,
  });
}

type LocalAttemptMutationArgs = {
  attempt: Attempt;
  photo: string;
};

export function useLocalAttemptMutation(goal: Goal | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["daily", "attempt", goal?.day],
    mutationFn: async ({ attempt, photo }: LocalAttemptMutationArgs) => {
      if (!goal) {
        return;
      }
      const daily = await store("daily");
      const raw = await daily.get(goal.day);
      const maybeGame = await safeParseAsync(Game, raw);
      const game = maybeGame.success
        ? maybeGame.output
        : ({
            attempts: [],
            day: goal.day,
            goal,
          } as Game);

      const win =
        attempt.every(({ kind }) => kind === "exact") &&
        attempt.length === goal.items.length;

      const newGame = {
        ...game,
        attempts: [...game.attempts, attempt].slice(0, 6),
        winning: win ? photo : undefined,
      } satisfies Game;

      await daily.put(newGame);
      return game;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["daily", "game", goal?.day]);
    },
  });
}
