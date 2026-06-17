import { useState } from "react";
import { Mic, Palette, ArrowLeft, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "@/components/messenger/VoiceRecorder";
import DrawingCanvas from "@/components/messenger/DrawingCanvas";
import FlyingBird from "@/components/messenger/FlyingBird";
import ReplyCard from "@/components/messenger/ReplyCard";
import { useMessengerStore } from "@/stores/useMessengerStore";
import { useUserStore } from "@/stores/useUserStore";
import { formatTime } from "@/utils/storage";

type TabType = "voice" | "drawing" | "history";

export default function Messenger() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("voice");
  const { messages, isSending, isReceiving, currentReply, sendMessage, clearCurrentReply } =
    useMessengerStore();
  const { addCoins } = useUserStore();

  const handleVoiceSend = (voiceData: string) => {
    sendMessage("voice", voiceData);
    addCoins(5);
  };

  const handleDrawingSend = (drawingData: string) => {
    sendMessage("drawing", drawingData);
    addCoins(5);
  };

  const tabs = [
    { key: "voice" as const, label: "说句话", icon: Mic },
    { key: "drawing" as const, label: "画张画", icon: Palette },
    { key: "history" as const, label: "回忆册", icon: History },
  ];

  const isBusy = isSending || isReceiving;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
      {/* 飞行动画 */}
      <FlyingBird isFlying={isSending} direction="to" />
      <FlyingBird isFlying={isReceiving} direction="from" />

      {/* 头部 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-white rounded-full shadow-soft hover:bg-gray-50 btn-bounce"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="font-display text-2xl text-warm-600">父母信使鸟</h1>
          <p className="text-sm text-gray-500">让小雁子把你的思念带给爸爸妈妈</p>
        </div>
      </div>

      {/* 回信弹窗 */}
      {currentReply && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md animate-grow">
            <div className="text-center mb-4">
              <div className="inline-block animate-bounce-gentle text-5xl mb-2">
                🐦💌
              </div>
              <p className="text-white font-medium">爸爸妈妈回信啦！</p>
            </div>
            <ReplyCard reply={currentReply} onClose={clearCurrentReply} />
          </div>
        </div>
      )}

      {/* Tab 切换 */}
      <div className="flex bg-white rounded-2xl p-1 shadow-soft mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-warm-500 text-white shadow-warm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 内容区 */}
      <div className="bg-white rounded-3xl shadow-soft p-6 min-h-[400px]">
        {activeTab === "voice" && (
          <div className="py-8">
            <VoiceRecorder onSend={handleVoiceSend} disabled={isBusy} />
          </div>
        )}

        {activeTab === "drawing" && (
          <div className="py-4">
            <DrawingCanvas onSend={handleDrawingSend} disabled={isBusy} />
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h3 className="font-medium text-gray-700 mb-4">我的回忆册</h3>
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-5xl mb-3">📭</div>
                <p>还没有消息呢，去给爸爸妈妈说句话吧～</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl ${
                      msg.isFromParent
                        ? "bg-warm-50 border-2 border-warm-200"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">
                        {msg.isFromParent ? "👩" : "🐦"}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {msg.isFromParent ? msg.parentName : "我"}
                      </span>
                      <span className="text-xs text-gray-400 ml-auto">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    {msg.isFromParent ? (
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {msg.replyText}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        {msg.type === "voice" ? "🎤 语音消息" : "🎨 绘画作品"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 提示 */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
          <span>💡</span>
          小提示：每发一条消息可以获得 5 金币哦～
        </p>
      </div>
    </div>
  );
}
