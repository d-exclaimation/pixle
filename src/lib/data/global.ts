import { useQuery } from "@tanstack/react-query";
import { safeParseAsync } from "valibot";
import { Goal } from "./common";

export function useGlobalOfTheDay() {
  return useQuery({
    queryKey: ["daily", "global"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/oftheday`
      );
      const raw = await response.json();
      const maybeData = await safeParseAsync(Goal, raw);

      if (maybeData.success) {
        return maybeData.output;
      }

      return {
        items: [
          {
            name: "person",
            icon: "👤",
            category: "House Entity",
            difficulty: 0,
          },
        ],
        difficulty: "easiest",
        day: new Date().toISOString().split("T")[0],
      } satisfies Goal;
    },
  });
}
