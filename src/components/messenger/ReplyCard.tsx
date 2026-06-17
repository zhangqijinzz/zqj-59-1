import { useState } from "react";
import { Play, Pause, Heart, Volume2 } from "lucide-react";
import { ParentReply } from "@/data/mockMessages";

interface ReplyCardProps {
  reply: ParentReply;
  onClose?: () => void;
}

export default function ReplyCard({ reply, onClose }: ReplyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showFullText, setShowFullText] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const moodEmojis = {
    happy: "😊",
    touched: "🥹",
    encouraging: "💪",
    missing: "😢",
  };

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden animate-grow">
      <div className="bg-gradient-to-r from-warm-400 to-warm-500 p-4 flex items-center gap-3">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-3xl">
          👩
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">妈妈</span>
            <span className="text-2xl">{moodEmojis[reply.mood]}</span>
          </div>
          <p className="text-white/80 text-sm">刚刚给你回信了</p>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`p-2 rounded-full transition-all ${
            liked ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
          }`}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="p-5">
        {/* 语音条 */}
        <div
          onClick={togglePlay}
          className="flex items-center gap-3 bg-warm-50 p-4 rounded-2xl cursor-pointer hover:bg-warm-100 transition-colors mb-4"
        >
          <button className="w-12 h-12 bg-warm-500 text-white rounded-full flex items-center justify-center btn-bounce">
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-warm-400 rounded-full transition-all ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: `${8 + Math.sin(i * 0.8) * 8}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">语音消息 · 点击播放</p>
          </div>
          <Volume2 size={18} className="text-warm-400" />
        </div>

        {/* 文字内容 */}
        <div className="bg-field-50 p-4 rounded-2xl">
          <p
            className={`text-gray-700 leading-relaxed ${
              showFullText ? "" : "line-clamp-3"
            }`}
          >
            {reply.text}
          </p>
          {reply.text.length > 100 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-sm text-field-600 mt-2 hover:underline"
            >
              {showFullText ? "收起" : "展开全文"}
            </button>
          )}
        </div>
      </div>

      {onClose && (
        <div className="px-5 pb-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
          >
            知道啦
          </button>
        </div>
      )}
    </div>
  );
}
