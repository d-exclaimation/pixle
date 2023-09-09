import { all } from "./categories";

const difficulties = [
  ["easiest", [4, 6]],
  ["easy", [6, 10]],
  ["medium", [11, 15]],
  ["hard", [16, 19]],
  ["hardest", [20, 26]],
] as const;

export function random() {
  const count = Math.floor(Math.random() * 3) + 2;
  const items = Array.from({ length: count }, () => false).map(
    () => all[Math.floor(Math.random() * all.length)]
  );

  const difficulty = items.reduce(
    (acc, curr) => acc + curr.difficulty,
    items.length
  );
  for (const [key, [min, max]] of difficulties) {
    if (difficulty >= min && difficulty <= max) {
      return { items, difficulty: key };
    }
  }

  // Too hard, try again
  return random();
}
