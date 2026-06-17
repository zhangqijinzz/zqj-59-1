import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";

const MOODS = [
  { emoji: "😊", label: "开心", color: "bg-wheat-100 hover:bg-wheat-200 border-wheat-300" },
  { emoji: "😌", label: "平静", color: "bg-sky-100 hover:bg-sky-200 border-sky-300" },
  { emoji: "😢", label: "想爸妈", color: "bg-warm-100 hover:bg-warm-200 border-warm-300" },
  { emoji: "😴", label: "累了", color: "bg-field-100 hover:bg-field-200 border-field-300" },
  { emoji: "😡", label: "生气", color: "bg-red-100 hover:bg-red-200 border-red-300" },
];

interface MoodPickerProps {
  onSelect?: (mood: string) => void;
}

export default function MoodPicker({ onSelect }: MoodPickerProps) {
  const { mood, setMood } = useUserStore();
  const [selectedMood, setSelectedMood] = useState<string | null>(mood);

  const handleSelect = (emoji: string, label: string) => {
    setSelectedMood(label);
    setMood(label);
    onSelect?.(label);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-500 font-medium">今天心情怎么样？</p>
      <div className="flex gap-2 sm:gap-3">
        {MOODS.map((m) => {
          const isSelected = selectedMood === m.label;
          return (
            <button
              key={m.label}
              onClick={() => handleSelect(m.emoji, m.label)}
              className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-2xl border-2 transition-all btn-bounce ${
                isSelected
                  ? `${m.color} scale-110 shadow-lg`
                  : "bg-white border-transparent hover:border-gray-200"
              }`}
            >
              <span className="text-2xl sm:text-3xl">{m.emoji}</span>
              <span className="text-xs text-gray-600 font-medium">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
