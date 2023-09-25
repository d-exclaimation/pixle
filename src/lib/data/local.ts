import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { safeParseAsync } from "valibot";
import { Attempt, Game, Games, Goal, Settings } from "./common";
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
        // Update the goal correctly match global
        const game = maybeGame.output;
        game.goal = goal;
        await daily.put(game);

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
    enabled: !!goal,
  });
}

type LocalAttemptMutationArgs = {
  attempt: Attempt;
  photo: string;
  mode: "hard" | "baby";
};

export function useLocalAttemptMutation(goal: Goal | undefined) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["daily", "attempt", goal?.day],
    mutationFn: async ({ attempt, photo, mode }: LocalAttemptMutationArgs) => {
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

      const attempts = [...game.attempts, attempt];

      const newGame = {
        ...game,
        attempts:
          mode === "hard"
            ? attempts.slice(0, 6)
            : attempts.slice(Math.max(0, attempts.length - 6)),
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

export function useResetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["daily", "reset"],
    mutationFn: async () => {
      const daily = await store("daily");
      const raw = await daily.getAll();
      const maybeGames = await safeParseAsync(Games, raw);
      if (!maybeGames.success) {
        return;
      }
      const games = maybeGames.output;
      const lastGame = games.at(-1);
      if (!lastGame || lastGame.winning) {
        return;
      }
      await daily.delete(lastGame.day);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "daily" && query.queryKey[1] === "game",
      });
    },
  });
}

export function useLocalSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const raw = localStorage.getItem("pixle:user:settings");
      const maybeSettings = await safeParseAsync(
        Settings,
        JSON.parse(raw ?? "{}")
      );
      if (maybeSettings.success) {
        return maybeSettings.output;
      }
      const settings = {
        mode: "hard",
        confidence: "lenient",
      } satisfies Settings;
      return settings;
    },
  });
}

export function useLocalSettingsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["settings"],
    mutationFn: async (updated: Settings) => {
      localStorage.setItem("pixle:user:settings", JSON.stringify(updated));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "settings",
      });
    },
  });
}
