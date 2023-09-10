import { useQuery } from "@tanstack/react-query";

export function useGlobalOfTheDay() {
  return useQuery({
    queryKey: ["daily", "global"],
    queryFn: async () => {
      const response = await fetch("https://camjam.deno.dev");
      const data = await response.json();
      return data as {
        items: {
          name: string;
          icon: string;
          category: string;
          difficulty: number;
        }[];
        difficulty: "easiest" | "easy" | "medium" | "hard" | "hardest";
      };
    },
  });
}
