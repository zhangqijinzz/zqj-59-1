export type ExploreCategory = "plant-animal" | "old-building" | "dialect";

export interface ExploreItem {
  id: string;
  category: ExploreCategory;
  title: string;
  description: string;
  image?: string;
  location?: string;
  date: string;
  tags: string[];
  audioUrl?: string;
  audioDuration?: number;
  createdAt: number;
}

export const CATEGORY_INFO: Record<ExploreCategory, {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}> = {
  "plant-animal": {
    label: "动植物",
    icon: "🌿",
    color: "text-field-600",
    bgColor: "bg-field-100",
    description: "记录家乡的花草树木、小鸟昆虫",
  },
  "old-building": {
    label: "老建筑",
    icon: "🏚️",
    color: "text-earth-700",
    bgColor: "bg-earth-100",
    description: "记录村里的老房子、老祠堂、古井",
  },
  "dialect": {
    label: "方言童谣",
    icon: "🎵",
    color: "text-warm-600",
    bgColor: "bg-warm-100",
    description: "录下爷爷奶奶教的童谣和方言",
  },
};
