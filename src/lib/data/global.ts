import { useQuery } from "@tanstack/react-query";

export function useGlobalOfTheDay() {
  return useQuery({
    queryKey: ["daily", "global"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/oftheday");
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