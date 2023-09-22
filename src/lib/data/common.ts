import * as v from "valibot";

export type Item = v.Output<typeof Item>;
export const Item = v.object({
  name: v.string(),
  icon: v.string(),
  category: v.string(),
  difficulty: v.number([v.integer(), v.minValue(0)]),
});

export type Rarity = v.Output<typeof Rarity>;
export const Rarity = v.enumType([
  "easiest",
  "easy",
  "medium",
  "hard",
  "hardest",
]);

export type Goal = v.Output<typeof Goal>;
export const Goal = v.object({
  items: v.array(Item),
  difficulty: Rarity,
  day: v.string(),
});

export type AttemptItem = v.Output<typeof AttemptItem>;
export const AttemptItem = v.object({
  name: v.string(),
  icon: v.string(),
  category: v.string(),
  kind: v.enumType(["exact", "similar", "none"]),
});

export type Attempt = v.Output<typeof Attempt>;
export const Attempt = v.array(AttemptItem);

export type Game = v.Output<typeof Game>;
export const Game = v.object({
  attempts: v.array(Attempt),
  winning: v.optional(v.string()),
  goal: Goal,
  day: v.string(),
});

export type Games = v.Output<typeof Games>;
export const Games = v.array(Game);

export type Settings = v.Output<typeof Settings>;
export const Settings = v.object({
  mode: v.enumType(["hard", "baby"]),
  confidence: v.enumType(["lenient", "medium", "strict"]),
});
