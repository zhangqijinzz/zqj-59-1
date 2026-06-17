export interface Crop {
  id: string;
  name: string;
  emoji: string;
  seedPrice: number;
  sellPrice: number;
  growTime: number;
  stages: string[];
}

export const CROPS: Crop[] = [
  {
    id: "carrot",
    name: "胡萝卜",
    emoji: "🥕",
    seedPrice: 10,
    sellPrice: 30,
    growTime: 30000,
    stages: ["🌱", "🌿", "🥬", "🥕"],
  },
  {
    id: "wheat",
    name: "小麦",
    emoji: "🌾",
    seedPrice: 15,
    sellPrice: 45,
    growTime: 45000,
    stages: ["🌱", "🌿", "🌾", "🌾"],
  },
  {
    id: "corn",
    name: "玉米",
    emoji: "🌽",
    seedPrice: 20,
    sellPrice: 60,
    growTime: 60000,
    stages: ["🌱", "🌿", "🌳", "🌽"],
  },
  {
    id: "tomato",
    name: "番茄",
    emoji: "🍅",
    seedPrice: 25,
    sellPrice: 75,
    growTime: 50000,
    stages: ["🌱", "🌿", "🌸", "🍅"],
  },
  {
    id: "sunflower",
    name: "向日葵",
    emoji: "🌻",
    seedPrice: 30,
    sellPrice: 90,
    growTime: 70000,
    stages: ["🌱", "🌿", "🌼", "🌻"],
  },
];

export function getCropById(id: string): Crop | undefined {
  return CROPS.find((c) => c.id === id);
}
