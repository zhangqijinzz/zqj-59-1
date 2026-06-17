import { Play, Lock, Award } from "lucide-react";
import { Story } from "@/data/mockStories";

interface StoryCoverProps {
  story: Story;
  onStart: () => void;
  completed?: boolean;
  hasBadge?: boolean;
}

export default function StoryCover({
  story,
  onStart,
  completed,
  hasBadge,
}: StoryCoverProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-soft overflow-hidden card-hover cursor-pointer ${
        completed ? "ring-2 ring-sky-400" : ""
      }`}
      onClick={onStart}
    >
      {/* 封面图 */}
      <div className="h-40 bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center relative">
        <div className="text-6xl">{story.coverEmoji}</div>
        {hasBadge && (
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 bg-wheat-400 rounded-full flex items-center justify-center text-white shadow-md">
              <Award size={20} />
            </div>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs px-2.5 py-1 bg-white/90 text-sky-600 rounded-full font-medium">
            {story.badge}
          </span>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4">
        <h3 className="font-display text-lg text-gray-800 mb-1">{story.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{story.description}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="w-full py-2.5 bg-sky-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 btn-bounce hover:bg-sky-600"
        >
          <Play size={18} fill="white" />
          {completed ? "再玩一次" : "开始故事"}
        </button>
      </div>
    </div>
  );
}
