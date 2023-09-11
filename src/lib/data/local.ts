import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { safeParseAsync } from "valibot";
import { Attempt, Game, Goal } from "./common";

export function useLocalGameOfTheDay(goal: Goal | undefined) {
  return useQuery({
    queryKey: ["daily", "game", goal?.day],
    queryFn: async () => {
      if (!goal) {
        throw new Error("No goal provided");
      }
      const raw = localStorage.getItem(`daily:game:${goal.day}`);
      const maybeGame = await safeParseAsync(Game, JSON.parse(raw ?? "{}"));
      if (maybeGame.success) {
        return maybeGame.output;
      }

      const game = {
        attempts: [],
        day: goal.day,
        goal,
      } as Game;

      localStorage.setItem(`daily:game:${goal.day}`, JSON.stringify(game));
      return game;
    },
    enabled: !!goal?.day,
  });
}

export function useLocalAttemptMutation(goal: Goal | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["daily", "attempt", goal?.day],
    mutationFn: async (attempt: Attempt) => {
      if (!goal) {
        return;
      }
      const raw = localStorage.getItem(`daily:game:${goal.day}`);
      const maybeGame = await safeParseAsync(Game, JSON.parse(raw ?? "{}"));
      const game = maybeGame.success
        ? maybeGame.output
        : ({
            attempts: [],
            day: goal.day,
            goal,
          } as Game);

      game.attempts.push(attempt);
      localStorage.setItem(`daily:game:${goal.day}`, JSON.stringify(game));
      return game;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["daily", "game", goal?.day]);
    },
  });
}
