import { FarmPlot as FarmPlotType } from "@/stores/useFarmStore";
import { getCropById } from "@/data/mockCrops";

interface FarmPlotProps {
  plot: FarmPlotType;
  onClick: () => void;
  isSelected?: boolean;
}

export default function FarmPlot({ plot, onClick, isSelected }: FarmPlotProps) {
  const crop = plot.crop ? getCropById(plot.crop) : null;

  const stageEmoji = (() => {
    if (!crop || !plot.crop) return null;
    const stageIndex =
      plot.stage === "seed"
        ? 0
        : plot.stage === "sprout"
        ? 1
        : plot.stage === "growing"
        ? 2
        : 3;
    return crop.stages[stageIndex] || crop.emoji;
  })();

  const bgColor =
    plot.stage === "empty"
      ? "bg-earth-400"
      : plot.stage === "mature"
      ? "bg-field-400"
      : "bg-earth-500";

  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-2xl ${bgColor} border-4 border-earth-600/30 
        transition-all btn-bounce overflow-hidden
        ${isSelected ? "ring-4 ring-warm-400 ring-offset-2 scale-105" : ""}
        ${plot.stage === "mature" ? "animate-pulse" : ""}
      `}
    >
      {/* 泥土纹理 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-2 left-2 w-2 h-1 bg-earth-700 rounded-full"></div>
        <div className="absolute top-4 right-3 w-3 h-1 bg-earth-700 rounded-full"></div>
        <div className="absolute bottom-3 left-4 w-2 h-1 bg-earth-700 rounded-full"></div>
        <div className="absolute bottom-5 right-2 w-1.5 h-1 bg-earth-700 rounded-full"></div>
      </div>

      {/* 作物 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {stageEmoji ? (
          <span
            className={`text-3xl sm:text-4xl ${
              plot.stage === "mature" ? "animate-bounce-gentle" : ""
            }`}
          >
            {stageEmoji}
          </span>
        ) : (
          <span className="text-earth-600/50 text-xs">空地</span>
        )}
      </div>

      {/* 浇水标志 */}
      {plot.watered && plot.stage !== "empty" && plot.stage !== "mature" && (
        <div className="absolute top-1 right-1 text-sm">💧</div>
      )}

      {/* 施肥标志 */}
      {plot.fertilized && plot.stage !== "empty" && plot.stage !== "mature" && (
        <div className="absolute top-1 left-1 text-sm">✨</div>
      )}

      {/* 成熟标志 */}
      {plot.stage === "mature" && (
        <div className="absolute -top-1 -right-1 bg-wheat-400 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
          可收获
        </div>
      )}
    </button>
  );
}
