import { excl } from "@d-exclaimation/next";

export const all = excl("items", () => [
  {
    name: "bowl",
    icon: "🥣",
    category: "Utensil",
  },
  {
    name: "spoon",
    icon: "🥄",
    category: "Utensil",
  },
  {
    name: "knife",
    icon: "🔪",
    category: "Utensil",
  },
  {
    name: "cup",
    icon: "🥤",
    category: "Beverage",
  },
  {
    name: "wine glass",
    icon: "🍷",
    category: "Beverage",
  },
  {
    name: "bottle",
    icon: "🍾",
    category: "Beverage",
  },
  {
    name: "cake",
    icon: "🎂",
    category: "Food",
  },
  {
    name: "donut",
    icon: "🍩",
    category: "Food",
  },
  {
    name: "pizza",
    icon: "🍕",
    category: "Food",
  },
  {
    name: "hot dog",
    icon: "🌭",
    category: "Food",
  },
  {
    name: "sandwich",
    icon: "🥪",
    category: "Food",
  },
  {
    name: "carrot",
    icon: "🥕",
    category: "Groceries",
  },
  {
    name: "broccoli",
    icon: "🥦",
    category: "Groceries",
  },
  {
    name: "orange",
    icon: "🍊",
    category: "Groceries",
  },
  {
    name: "apple",
    icon: "🍎",
    category: "Groceries",
  },
  {
    name: "banana",
    icon: "🍌",
    category: "Groceries",
  },
  {
    name: "surfboard",
    icon: "🏄‍♂️",
    category: "Sport Gear",
  },
  {
    name: "skateboard",
    icon: "🛹",
    category: "Sport Gear",
  },
  {
    name: "snowboard",
    icon: "🏂",
    category: "Sport Gear",
  },
  {
    name: "skis",
    icon: "🎿",
    category: "Sport Gear",
  },
  {
    name: "kite",
    icon: "🪁",
    category: "Sport Object",
  },
  {
    name: "sports ball",
    icon: "⚽",
    category: "Sport Object",
  },
  {
    name: "frisbee",
    icon: "🥏",
    category: "Sport Object",
  },
  {
    name: "phone",
    icon: "📱",
    category: "Electronics",
  },
  {
    name: "keyboard",
    icon: "⌨️",
    category: "Electronics",
  },
  {
    name: "mouse",
    icon: "🖱️",
    category: "Electronics",
  },
  {
    name: "laptop",
    icon: "💻",
    category: "Electronics",
  },
  {
    name: "tvmonitor",
    icon: "📺",
    category: "Electronics",
  },
  {
    name: "toothbrush",
    icon: "🪥",
    category: "Small Object",
  },
  {
    name: "teddy bear",
    icon: "🧸",
    category: "Small Object",
  },
  {
    name: "scissors",
    icon: "✂️",
    category: "Small Object",
  },
  {
    name: "clock",
    icon: "🕰️",
    category: "Small Object",
  },
  {
    name: "book",
    icon: "📚",
    category: "Small Object",
  },
  {
    name: "chair",
    icon: "🪑",
    category: "Public Object",
  },
  {
    name: "traffic light",
    icon: "🚦",
    category: "Public Object",
  },
  {
    name: "vase",
    icon: "🏺",
    category: "House Object",
  },
  {
    name: "pottedplant",
    icon: "🪴",
    category: "House Object",
  },
  {
    name: "sofa",
    icon: "🛋️",
    category: "House Object",
  },
  {
    name: "toilet",
    icon: "🚽",
    category: "House Object",
  },
  {
    name: "bed",
    icon: "🛏️",
    category: "House Object",
  },
  {
    name: "suitcase",
    icon: "💼",
    category: "Clothing Object",
  },
  {
    name: "umbrella",
    icon: "☂️",
    category: "Clothing Object",
  },
  {
    name: "tie",
    icon: "👔",
    category: "Clothing Object",
  },
  {
    name: "handbag",
    icon: "👜",
    category: "Clothing Object",
  },
  {
    name: "backpack",
    icon: "🎒",
    category: "Clothing Object",
  },
  {
    name: "boat",
    icon: "⛵",
    category: "Public Transport",
  },
  {
    name: "train",
    icon: "🚂",
    category: "Public Transport",
  },
  {
    name: "bus",
    icon: "🚌",
    category: "Public Transport",
  },
  {
    name: "aeroplane",
    icon: "🛩️",
    category: "Public Transport",
  },
  {
    name: "truck",
    icon: "🚛",
    category: "Transport",
  },
  {
    name: "motorbike",
    icon: "🛵",
    category: "Transport",
  },
  {
    name: "car",
    icon: "🚘",
    category: "Transport",
  },
  {
    name: "bicycle",
    icon: "🚲",
    category: "Transport",
  },
  {
    name: "giraffe",
    icon: "🦒",
    category: "Wild Entity",
  },
  {
    name: "zebra",
    icon: "🦓",
    category: "Wild Entity",
  },
  {
    name: "bear",
    icon: "🐻",
    category: "Wild Entity",
  },
  {
    name: "elephant",
    icon: "🐘",
    category: "Wild Entity",
  },
  {
    name: "cow",
    icon: "🐮",
    category: "Farm Entity",
  },
  {
    name: "sheep",
    icon: "🐑",
    category: "Farm Entity",
  },
  {
    name: "horse",
    icon: "🐴",
    category: "Farm Entity",
  },
  {
    name: "person",
    icon: "👤",
    category: "House Entity",
  },
  {
    name: "bird",
    icon: "🕊️",
    category: "House Entity",
  },
  {
    name: "cat",
    icon: "🐱",
    category: "House Entity",
  },
  {
    name: "dog",
    icon: "🐶",
    category: "House Entity",
  },
]);

export const categories = excl("categories", () =>
  all.reduce((acc, curr) => {
    const existing = acc.get(curr.category) ?? [];
    existing.push(curr);
    acc.set(curr.category, existing);
    return acc;
  }, new Map<string, typeof all>())
);

export function item(name: string) {
  return all.find((x) => x.name === name);
}
