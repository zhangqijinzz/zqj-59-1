import { Sprout, Droplets, Sparkles, Scissors } from "lucide-react";
import { ToolType } from "@/stores/useFarmStore";

interface ToolbarProps {
  selectedTool: ToolType | null;
  onSelectTool: (tool: ToolType) => void;
  disabled?: boolean;
}

const tools: { type: ToolType; label: string; icon: typeof Sprout; color: string }[] = [
  { type: "seed", label: "播种", icon: Sprout, color: "text-field-600 bg-field-50" },
  { type: "water", label: "浇水", icon: Droplets, color: "text-sky-600 bg-sky-50" },
  { type: "fertilizer", label: "施肥", icon: Sparkles, color: "text-wheat-600 bg-wheat-50" },
  { type: "harvest", label: "收获", icon: Scissors, color: "text-warm-600 bg-warm-50" },
];

export default function Toolbar({
  selectedTool,
  onSelectTool,
  disabled,
}: ToolbarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-3">
      <div className="flex justify-around">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = selectedTool === tool.type;
          return (
            <button
              key={tool.type}
              onClick={() => onSelectTool(tool.type)}
              disabled={disabled}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all btn-bounce ${
                isActive
                  ? `${tool.color} scale-110 shadow-md`
                  : "text-gray-400 hover:text-gray-600"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium">{tool.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
