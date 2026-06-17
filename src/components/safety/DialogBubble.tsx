import { StoryNode } from "@/data/mockStories";

interface DialogBubbleProps {
  node: StoryNode;
  text: string;
}

const speakerAvatars: Record<string, string> = {
  narrator: "📖",
  xiaoming: "👦",
  grandma: "👵",
  stranger: "🧔",
  friend: "🧒",
};

const speakerNames: Record<string, string> = {
  narrator: "旁白",
  xiaoming: "小明",
  grandma: "奶奶",
  stranger: "陌生人",
  friend: "小刚",
};

const emotionColors: Record<string, string> = {
  happy: "bg-warm-50 border-warm-200",
  worried: "bg-wheat-50 border-wheat-200",
  scared: "bg-red-50 border-red-200",
  neutral: "bg-white border-gray-200",
  angry: "bg-red-50 border-red-200",
};

export default function DialogBubble({ node, text }: DialogBubbleProps) {
  const isNarrator = node.speaker === "narrator";
  const avatar = speakerAvatars[node.speaker] || "👤";
  const name = speakerNames[node.speaker] || "未知";
  const colorClass = node.emotion ? emotionColors[node.emotion] : emotionColors.neutral;

  if (isNarrator) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-100/80 text-gray-600 px-5 py-3 rounded-2xl max-w-md text-center text-sm italic">
          {text}
        </div>
      </div>
    );
  }

  const isMainCharacter = node.speaker === "xiaoming";

  return (
    <div
      className={`flex gap-3 ${isMainCharacter ? "flex-row-reverse" : ""} animate-fade-in-up`}
    >
      {/* 头像 */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center text-2xl">
          {avatar}
        </div>
      </div>

      {/* 对话气泡 */}
      <div className={`max-w-[70%] ${isMainCharacter ? "items-end" : "items-start"}`}>
        <p className="text-xs text-gray-500 mb-1 px-2">{name}</p>
        <div
          className={`px-4 py-3 rounded-2xl border-2 ${colorClass} shadow-sm relative`}
        >
          <p className="text-gray-700 leading-relaxed">{text}</p>
          {/* 气泡小尾巴 */}
          <div
            className={`absolute top-3 w-3 h-3 border-2 border-t-0 ${
              isMainCharacter
                ? "right-0 -mr-2 border-l-0 rounded-br-lg rotate-45"
                : "left-0 -ml-2 border-r-0 rounded-bl-lg -rotate-45"
            }`}
            style={{
              backgroundColor: "inherit",
              borderColor: "inherit",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
