import { MapPin, Calendar, Tag } from "lucide-react";
import { ExploreItem, CATEGORY_INFO } from "@/data/mockExplore";

interface ExploreCardProps {
  item: ExploreItem;
  onClick: () => void;
}

export default function ExploreCard({ item, onClick }: ExploreCardProps) {
  const info = CATEGORY_INFO[item.category];

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-soft overflow-hidden card-hover cursor-pointer"
    >
      {/* 图片/图标区 */}
      <div className={`${info.bgColor} h-28 flex items-center justify-center relative`}>
        <span className="text-5xl">{item.image || info.icon}</span>
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 bg-white/80 rounded-full ${info.color} font-medium`}>
            {info.label}
          </span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-3">
        <h4 className="font-medium text-gray-800 mb-1 line-clamp-1">{item.title}</h4>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{item.description}</p>

        {/* 元信息 */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          {item.location && (
            <span className="flex items-center gap-0.5">
              <MapPin size={12} />
              {item.location}
            </span>
          )}
          <span className="flex items-center gap-0.5">
            <Calendar size={12} />
            {item.date}
          </span>
        </div>

        {/* 标签 */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
