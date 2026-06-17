import { X, MapPin, Calendar, Tag, Trash2, Play, Pause } from "lucide-react";
import { useState } from "react";
import { ExploreItem, CATEGORY_INFO } from "@/data/mockExplore";
import { useExploreStore } from "@/stores/useExploreStore";

interface ItemDetailProps {
  item: ExploreItem;
  onClose: () => void;
}

export default function ItemDetail({ item, onClose }: ItemDetailProps) {
  const { deleteItem } = useExploreStore();
  const info = CATEGORY_INFO[item.category];
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    deleteItem(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-grow">
        {/* 头部大图 */}
        <div className={`${info.bgColor} h-48 flex items-center justify-center relative rounded-t-3xl`}>
          <span className="text-8xl animate-bounce-gentle">
            {item.image || info.icon}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/60 rounded-full hover:bg-white transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className={`text-sm px-3 py-1 bg-white/90 rounded-full ${info.color} font-medium`}>
              {info.label}
            </span>
          </div>
        </div>

        {/* 内容 */}
        <div className="p-5">
          <h3 className="font-display text-xl text-gray-800 mb-3">{item.title}</h3>

          {/* 元信息 */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-500">
            {item.location && (
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-wheat-500" />
                {item.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-wheat-500" />
              {item.date}
            </span>
          </div>

          {/* 描述 */}
          <div className="bg-wheat-50 rounded-2xl p-4 mb-4">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {item.description || "还没有添加描述～"}
            </p>
          </div>

          {/* 音频播放（方言童谣） */}
          {item.category === "dialect" && (
            <div className="bg-warm-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-warm-500 text-white rounded-full flex items-center justify-center btn-bounce"
                >
                  {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-warm-300 rounded-full transition-all ${
                          isPlaying ? "animate-pulse" : ""
                        }`}
                        style={{
                          height: `${6 + Math.sin(i * 0.7) * 6}px`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {item.audioDuration ? `${item.audioDuration}"` : "—"}
                </span>
              </div>
            </div>
          )}

          {/* 标签 */}
          {item.tags.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Tag size={14} />
                标签
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-wheat-100 text-wheat-700 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 删除按钮 */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-3 border-2 border-red-200 text-red-500 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} />
            删除这条记录
          </button>
        </div>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-grow">
            <h4 className="font-medium text-gray-800 mb-2">确认删除？</h4>
            <p className="text-sm text-gray-500 mb-4">
              删除后就找不回来了哦，确定要删除这条记录吗？
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                再想想
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
