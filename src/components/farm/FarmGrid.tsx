import { FarmPlot as FarmPlotType } from "@/stores/useFarmStore";
import FarmPlot from "./FarmPlot";

interface FarmGridProps {
  plots: FarmPlotType[];
  onPlotClick: (plotId: number) => void;
  selectedPlotId?: number | null;
}

export default function FarmGrid({
  plots,
  onPlotClick,
  selectedPlotId,
}: FarmGridProps) {
  return (
    <div className="relative p-4 bg-gradient-to-b from-sky-200 to-sky-100 rounded-3xl">
      {/* 太阳 */}
      <div className="absolute -top-2 right-4 text-4xl animate-float-slow">
        ☀️
      </div>

      {/* 云朵 */}
      <div className="absolute top-4 left-4 text-2xl opacity-60 animate-float">
        ☁️
      </div>
      <div className="absolute top-10 right-20 text-xl opacity-40 animate-float-slow">
        ☁️
      </div>

      {/* 农田 */}
      <div className="pt-12 pb-4">
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {plots.map((plot) => (
            <FarmPlot
              key={plot.id}
              plot={plot}
              onClick={() => onPlotClick(plot.id)}
              isSelected={selectedPlotId === plot.id}
            />
          ))}
        </div>
      </div>

      {/* 栅栏装饰 */}
      <div className="absolute -bottom-2 left-0 right-0 flex justify-around px-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-3 h-6 bg-amber-700 rounded-t-sm"></div>
        ))}
      </div>
    </div>
  );
}
