import { CROPS, Crop } from "@/data/mockCrops";
import { X } from "lucide-react";

interface SeedSelectorProps {
  onSelect: (crop: Crop) => void;
  onClose: () => void;
  coins: number;
}

export default function SeedSelector({ onSelect, onClose, coins }: SeedSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4 animate-grow">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-gray-700">选择种子</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {CROPS.map((crop) => {
          const canAfford = coins >= crop.seedPrice;
          return (
            <button
              key={crop.id}
              onClick={() => canAfford && onSelect(crop)}
              disabled={!canAfford}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all btn-bounce ${
                canAfford
                  ? "bg-field-50 hover:bg-field-100 text-field-700"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <span className="text-2xl">{crop.emoji}</span>
              <span className="text-xs font-medium">{crop.name}</span>
              <span className="text-xs text-wheat-600">
                💰 {crop.seedPrice}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
