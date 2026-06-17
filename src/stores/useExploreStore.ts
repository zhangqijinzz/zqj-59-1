import { create } from "zustand";
import { getStorage, setStorage, generateId, getTodayString } from "@/utils/storage";
import { ExploreItem, ExploreCategory } from "@/data/mockExplore";

interface ExploreState {
  items: ExploreItem[];
  addItem: (item: Omit<ExploreItem, "id" | "createdAt">) => void;
  deleteItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<ExploreItem>) => void;
  getItemsByCategory: (category: ExploreCategory) => ExploreItem[];
  getStats: () => { total: number; byCategory: Record<ExploreCategory, number> };
}

const INITIAL_ITEMS: ExploreItem[] = [
  {
    id: "init-1",
    category: "plant-animal",
    title: "村口的大槐树",
    description: "村口有一棵好大的槐树，奶奶说它已经有一百多岁了。夏天的时候，全村的人都在树下乘凉。",
    image: "🌳",
    location: "东村口",
    date: "2024-05-12",
    tags: ["古树", "槐树"],
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "init-2",
    category: "plant-animal",
    title: "后山上的小野花",
    description: "紫色的小野花，一片一片的，像铺了紫色的地毯。蜜蜂嗡嗡地飞来飞去。",
    image: "🌸",
    location: "后山坡",
    date: "2024-05-10",
    tags: ["野花", "春天"],
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "init-3",
    category: "old-building",
    title: "李家祠堂",
    description: "村里最老的建筑，青砖灰瓦，门上有两个石头狮子。过年的时候全村人都来这里拜年。",
    image: "🏛️",
    location: "村中央",
    date: "2024-04-20",
    tags: ["祠堂", "清代建筑"],
    createdAt: Date.now() - 86400000 * 15,
  },
  {
    id: "init-4",
    category: "dialect",
    title: "月光光",
    description: "奶奶教的童谣，月光光，照地堂，年三十晚摘槟榔...",
    image: "🌙",
    location: "奶奶家",
    date: "2024-05-08",
    tags: ["童谣", "奶奶"],
    audioDuration: 45,
    createdAt: Date.now() - 86400000 * 7,
  },
];

function loadItems(): ExploreItem[] {
  const saved = getStorage<ExploreItem[] | null>("explore_items", null);
  if (saved !== null) return saved;
  return INITIAL_ITEMS;
}

function saveItems(items: ExploreItem[]) {
  setStorage("explore_items", items);
}

export const useExploreStore = create<ExploreState>((set, get) => {
  const items = loadItems();

  return {
    items,

    addItem: (item) => {
      const newItem: ExploreItem = {
        ...item,
        id: generateId(),
        createdAt: Date.now(),
      };
      const newItems = [newItem, ...get().items];
      set({ items: newItems });
      saveItems(newItems);
    },

    deleteItem: (id) => {
      const newItems = get().items.filter((item) => item.id !== id);
      set({ items: newItems });
      saveItems(newItems);
    },

    updateItem: (id, updates) => {
      const newItems = get().items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      set({ items: newItems });
      saveItems(newItems);
    },

    getItemsByCategory: (category) => {
      return get().items.filter((item) => item.category === category);
    },

    getStats: () => {
      const items = get().items;
      return {
        total: items.length,
        byCategory: {
          "plant-animal": items.filter((i) => i.category === "plant-animal").length,
          "old-building": items.filter((i) => i.category === "old-building").length,
          "dialect": items.filter((i) => i.category === "dialect").length,
        },
      };
    },
  };
});
