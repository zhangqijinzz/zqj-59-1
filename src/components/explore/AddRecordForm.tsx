import { useState } from "react";
import { X, MapPin, Calendar, Tag, Send } from "lucide-react";
import { ExploreCategory, CATEGORY_INFO } from "@/data/mockExplore";
import { useExploreStore } from "@/stores/useExploreStore";
import { useUserStore } from "@/stores/useUserStore";

interface AddRecordFormProps {
  category: ExploreCategory;
  onClose: () => void;
}

const EMOJI_OPTIONS: Record<ExploreCategory, string[]> = {
  "plant-animal": ["🌳", "🌸", "🌻", "🍀", "🌺", "🦋", "🐦", "🐞", "🌿", "🍃", "🌵", "🍄"],
  "old-building": ["🏚️", "🏛️", "⛩️", "🏠", "🕍", "⛪", "🏡", "🕌"],
  "dialect": ["🎵", "🎶", "🎤", "📻", "🎼", "🎹"],
};

export default function AddRecordForm({ category, onClose }: AddRecordFormProps) {
  const { addItem } = useExploreStore();
  const { addCoins } = useUserStore();
  const info = CATEGORY_INFO[category];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[category][0]);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(/[,，、\s]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    addItem({
      category,
      title: title.trim(),
      description: description.trim(),
      image: selectedEmoji,
      location: location.trim() || undefined,
      date,
      tags,
    });

    addCoins(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-grow">
        {/* 头部 */}
        <div className={`${info.bgColor} p-5 rounded-t-3xl flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{info.icon}</span>
            <div>
              <h3 className="font-display text-lg text-gray-800">记录新{info.label}</h3>
              <p className="text-xs text-gray-500">记录+10金币</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/60 rounded-full hover:bg-white transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* 选择图标 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              选个图标
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS[category].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    selectedEmoji === emoji
                      ? "bg-wheat-100 ring-2 ring-wheat-400 scale-110"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* 标题 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"给这个" + info.label + "起个名字"}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-wheat-400 focus:outline-none transition-colors"
              maxLength={30}
            />
          </div>

          {/* 描述 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              说说它的故事
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="它有什么特别的地方？和它有什么故事？"
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-wheat-400 focus:outline-none transition-colors resize-none"
              maxLength={200}
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {description.length}/200
            </p>
          </div>

          {/* 地点 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block flex items-center gap-1">
              <MapPin size={14} />
              在哪里发现的？
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="比如：村东口、后山..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-wheat-400 focus:outline-none transition-colors"
              maxLength={20}
            />
          </div>

          {/* 日期 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block flex items-center gap-1">
              <Calendar size={14} />
              什么时候记录的？
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-wheat-400 focus:outline-none transition-colors"
            />
          </div>

          {/* 标签 */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block flex items-center gap-1">
              <Tag size={14} />
              标签（用逗号分隔）
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="比如：古树, 夏天, 奶奶..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-wheat-400 focus:outline-none transition-colors"
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={!title.trim()}
            className={`w-full py-4 rounded-2xl font-medium flex items-center justify-center gap-2 btn-bounce ${
              title.trim()
                ? "bg-wheat-500 text-white shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send size={18} />
            保存到我的乡村志
          </button>
        </form>
      </div>
    </div>
  );
}
