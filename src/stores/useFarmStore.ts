import { create } from "zustand";
import { getStorage, setStorage } from "@/utils/storage";
import { getCropById, Crop } from "@/data/mockCrops";

export type CropStage = "empty" | "seed" | "sprout" | "growing" | "mature";

export interface FarmPlot {
  id: number;
  crop: string | null;
  stage: CropStage;
  plantedAt: number | null;
  watered: boolean;
  fertilized: boolean;
}

export type ToolType = "seed" | "water" | "fertilizer" | "harvest";

interface FarmState {
  plots: FarmPlot[];
  selectedTool: ToolType | null;
  selectedCrop: Crop | null;
  parentActions: { time: string; action: string; by: string }[];
  selectTool: (tool: ToolType | null) => void;
  selectCrop: (crop: Crop | null) => void;
  plantSeed: (plotId: number, cropId: string) => boolean;
  waterPlot: (plotId: number) => boolean;
  fertilizePlot: (plotId: number) => boolean;
  harvestPlot: (plotId: number) => number;
  updateGrowth: () => void;
  addParentAction: (action: string, by: string) => void;
}

function createInitialPlots(): FarmPlot[] {
  return Array.from({ length: 9 }, (_, i) => ({
    id: i,
    crop: null,
    stage: "empty" as CropStage,
    plantedAt: null,
    watered: false,
    fertilized: false,
  }));
}

function loadPlots(): FarmPlot[] {
  const saved = getStorage<FarmPlot[]>("farm_plots", null);
  if (saved) return saved;
  return createInitialPlots();
}

function savePlots(plots: FarmPlot[]) {
  setStorage("farm_plots", plots);
}

const INITIAL_PARENT_ACTIONS = [
  { time: "昨天 18:30", action: "给玉米地浇水了", by: "爸爸" },
  { time: "昨天 09:15", action: "种下了小麦种子", by: "妈妈" },
  { time: "前天 20:00", action: "收获了胡萝卜", by: "爸爸" },
];

export const useFarmStore = create<FarmState>((set, get) => {
  const plots = loadPlots();

  return {
    plots,
    selectedTool: null,
    selectedCrop: null,
    parentActions: INITIAL_PARENT_ACTIONS,

    selectTool: (tool) => {
      set({ selectedTool: tool });
      if (tool !== "seed") {
        set({ selectedCrop: null });
      }
    },

    selectCrop: (crop) => {
      set({ selectedCrop: crop });
    },

    plantSeed: (plotId, cropId) => {
      const crop = getCropById(cropId);
      if (!crop) return false;

      const plot = get().plots.find((p) => p.id === plotId);
      if (!plot || plot.stage !== "empty") return false;

      const newPlots = get().plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              crop: cropId,
              stage: "seed" as CropStage,
              plantedAt: Date.now(),
              watered: false,
              fertilized: false,
            }
          : p
      );

      set({ plots: newPlots });
      savePlots(newPlots);
      return true;
    },

    waterPlot: (plotId) => {
      const plot = get().plots.find((p) => p.id === plotId);
      if (!plot || plot.stage === "empty" || plot.stage === "mature" || plot.watered) return false;

      const newPlots = get().plots.map((p) =>
        p.id === plotId ? { ...p, watered: true } : p
      );

      set({ plots: newPlots });
      savePlots(newPlots);
      return true;
    },

    fertilizePlot: (plotId) => {
      const plot = get().plots.find((p) => p.id === plotId);
      if (!plot || plot.stage === "empty" || plot.stage === "mature" || plot.fertilized) return false;

      const newPlots = get().plots.map((p) =>
        p.id === plotId ? { ...p, fertilized: true } : p
      );

      set({ plots: newPlots });
      savePlots(newPlots);
      return true;
    },

    harvestPlot: (plotId) => {
      const plot = get().plots.find((p) => p.id === plotId);
      if (!plot || plot.stage !== "mature" || !plot.crop) return 0;

      const crop = getCropById(plot.crop);
      if (!crop) return 0;

      let earnings = crop.sellPrice;
      if (plot.fertilized) earnings = Math.floor(earnings * 1.5);

      const newPlots = get().plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              crop: null,
              stage: "empty" as CropStage,
              plantedAt: null,
              watered: false,
              fertilized: false,
            }
          : p
      );

      set({ plots: newPlots });
      savePlots(newPlots);
      return earnings;
    },

    updateGrowth: () => {
      const now = Date.now();
      const newPlots = get().plots.map((plot) => {
        if (!plot.crop || !plot.plantedAt || plot.stage === "mature") return plot;

        const crop = getCropById(plot.crop);
        if (!crop) return plot;

        const elapsed = now - plot.plantedAt;
        let speedMultiplier = 1;
        if (plot.watered) speedMultiplier *= 1.3;
        if (plot.fertilized) speedMultiplier *= 1.5;

        const adjustedTime = elapsed * speedMultiplier;
        const progress = Math.min(adjustedTime / crop.growTime, 1);

        let stage: CropStage = "seed";
        if (progress >= 1) stage = "mature";
        else if (progress >= 0.66) stage = "growing";
        else if (progress >= 0.33) stage = "sprout";
        else stage = "seed";

        if (stage === plot.stage) return plot;
        return { ...plot, stage };
      });

      const hasChanges = newPlots.some((p, i) => p.stage !== get().plots[i].stage);
      if (hasChanges) {
        set({ plots: newPlots });
        savePlots(newPlots);
      }
    },

    addParentAction: (action, by) => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const newActions = [{ time: `今天 ${timeStr}`, action, by }, ...get().parentActions.slice(0, 4)];
      set({ parentActions: newActions });
    },
  };
});
