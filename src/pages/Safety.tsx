import { useState } from "react";
import { ArrowLeft, Home, RotateCcw, Shield, Award, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StoryCover from "@/components/safety/StoryCover";
import DialogBubble from "@/components/safety/DialogBubble";
import ChoiceButtons from "@/components/safety/ChoiceButtons";
import { STORIES, getStoryById, getStoryNode, StoryNode } from "@/data/mockStories";
import { useUserStore } from "@/stores/useUserStore";

export default function Safety() {
  const navigate = useNavigate();
  const { safetyBadges, addSafetyBadge, hasBadge, addCoins } = useUserStore();
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(false);

  const currentStory = currentStoryId ? getStoryById(currentStoryId) : null;
  const currentNode = currentStory && currentNodeId
    ? getStoryNode(currentStory, currentNodeId)
    : null;

  const startStory = (storyId: string) => {
    const story = getStoryById(storyId);
    if (!story) return;

    setCurrentStoryId(storyId);
    setCurrentNodeId("start");
    setHistory(["start"]);
    setShowChoices(false);
    setSelectedChoice(null);
    setShowResult(false);
    setEarnedBadge(false);
    typeText(story.nodes.find((n) => n.id === "start")?.text || "");
  };

  const typeText = (text: string) => {
    setIsTyping(true);
    setDisplayedText("");
    setShowChoices(false);
    setSelectedChoice(null);
    setShowResult(false);

    let index = 0;
    const speed = 45;

    const timer = setInterval(() => {
      index += 1;
      if (index >= text.length) {
        setDisplayedText(text);
        setIsTyping(false);
        setShowChoices(true);
        clearInterval(timer);
      } else {
        setDisplayedText(text.substring(0, index));
      }
    }, speed);
  };

  const skipTyping = () => {
    if (!isTyping || !currentNode) return;
    setDisplayedText(currentNode.text);
    setIsTyping(false);
    setShowChoices(true);
  };

  const handleChoose = (nextNodeId: string, isCorrect?: boolean) => {
    if (isTyping) return;

    const choiceIndex = currentNode?.choices?.findIndex((c) => c.nextNodeId === nextNodeId);
    if (choiceIndex !== undefined) {
      setSelectedChoice(choiceIndex);
      setShowResult(true);
      setShowChoices(false);
    }

    setTimeout(() => {
      const nextStory = getStoryById(currentStoryId!);
      const nextNode = nextStory?.nodes.find((n) => n.id === nextNodeId);

      if (nextNode) {
        setCurrentNodeId(nextNodeId);
        setHistory([...history, nextNodeId]);
        typeText(nextNode.text);

        if (nextNode.isEnding && nextNode.endingType === "good" && currentStory) {
          if (!hasBadge(currentStory.badge)) {
            addSafetyBadge(currentStory.badge);
            addCoins(50);
            setEarnedBadge(true);
          }
        }
      }
    }, 1500);
  };

  const restartStory = () => {
    if (currentStoryId) {
      startStory(currentStoryId);
    }
  };

  const exitStory = () => {
    setCurrentStoryId(null);
    setCurrentNodeId(null);
    setDisplayedText("");
    setHistory([]);
  };

  // 故事列表页
  if (!currentStory) {
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* 头部 */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 bg-white rounded-full shadow-soft hover:bg-gray-50 btn-bounce"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-2xl text-sky-600">安全守护剧情</h1>
            <p className="text-sm text-gray-500">在故事里学习安全知识</p>
          </div>
          <div className="flex items-center gap-1 bg-wheat-100 px-3 py-1.5 rounded-full">
            <Award size={18} className="text-wheat-500" />
            <span className="text-sm font-medium text-wheat-700">
              {safetyBadges.length}/{STORIES.length}
            </span>
          </div>
        </div>

        {/* 介绍卡片 */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-400 rounded-3xl p-6 text-white mb-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="text-5xl animate-bounce-gentle">🛡️</div>
            <div>
              <h2 className="font-display text-xl mb-1">做自己的安全小卫士</h2>
              <p className="text-sky-100 text-sm leading-relaxed">
                通过有趣的互动故事，学会保护自己。
                每通过一个故事，就能获得一枚安全徽章哦～
              </p>
            </div>
          </div>
        </div>

        {/* 故事列表 */}
        <h3 className="font-display text-lg text-gray-700 mb-4 flex items-center gap-2">
          <span>📚</span>
          安全故事
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STORIES.map((story) => (
            <StoryCover
              key={story.id}
              story={story}
              onStart={() => startStory(story.id)}
              completed={hasBadge(story.badge)}
              hasBadge={hasBadge(story.badge)}
            />
          ))}
        </div>
      </div>
    );
  }

  // 故事播放页
  const isEnding = currentNode?.isEnding;
  const isGoodEnding = currentNode?.endingType === "good";

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white/80 backdrop-blur-md sticky top-16 z-40 py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <button
            onClick={exitStory}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Home size={20} className="text-gray-600" />
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-500">正在阅读</p>
            <h2 className="font-display text-lg text-gray-800">{currentStory.title}</h2>
          </div>
          <button
            onClick={restartStory}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            title="重新开始"
          >
            <RotateCcw size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* 剧情内容区 */}
      <div
        className="flex-1 py-6 cursor-pointer"
        onClick={skipTyping}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          {/* 场景背景 */}
          <div className="h-40 bg-gradient-to-b from-sky-200 to-sky-100 rounded-3xl mb-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-field-200 rounded-b-3xl"></div>
            <div className="text-6xl relative z-10 animate-bounce-gentle">
              {currentStory.coverEmoji}
            </div>
            <div className="absolute top-4 left-6 text-3xl opacity-40 animate-float">
              ☁️
            </div>
            <div className="absolute top-8 right-10 text-2xl opacity-30 animate-float-slow">
              ☁️
            </div>
          </div>

          {/* 对话气泡 */}
          {currentNode && (
            <div className="mb-6">
              <DialogBubble node={currentNode} text={displayedText} />
            </div>
          )}

          {/* 点击继续提示 */}
          {isTyping && (
            <div className="text-center text-sm text-gray-400 animate-pulse">
              点击屏幕跳过...
            </div>
          )}

          {/* 结局展示 */}
          {isEnding && !isTyping && showChoices && (
            <div
              className={`p-6 rounded-3xl animate-grow ${
                isGoodEnding
                  ? "bg-field-50 border-2 border-field-300"
                  : "bg-red-50 border-2 border-red-300"
              }`}
            >
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">
                  {isGoodEnding ? "🎉" : "⚠️"}
                </div>
                <h3 className="font-display text-xl mb-1">
                  {isGoodEnding ? "完美结局！" : "这样做很危险！"}
                </h3>
                <p className="text-sm text-gray-500">
                  {isGoodEnding ? "你做出了正确的选择！" : "千万不要学这样做哦～"}
                </p>
              </div>

              {currentNode?.safetyTip && (
                <div
                  className={`p-4 rounded-2xl ${
                    isGoodEnding ? "bg-white" : "bg-white"
                  }`}
                >
                  <p
                    className={`font-medium mb-2 flex items-center gap-2 ${
                      isGoodEnding ? "text-field-700" : "text-red-700"
                    }`}
                  >
                    <Shield size={18} />
                    {currentNode.safetyTitle || "安全小贴士"}
                  </p>
                  <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                    {currentNode.safetyTip}
                  </p>
                </div>
              )}

              {earnedBadge && isGoodEnding && (
                <div className="mt-4 text-center animate-grow">
                  <div className="inline-flex items-center gap-2 bg-wheat-400 text-white px-4 py-2 rounded-full font-medium shadow-md">
                    <Award size={18} />
                    获得安全徽章！ +50 金币
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 选项按钮 */}
          {currentNode?.choices && showChoices && !isEnding && (
            <ChoiceButtons
              choices={currentNode.choices}
              onChoose={handleChoose}
              disabled={isTyping}
              showResult={showResult}
              selectedIndex={selectedChoice ?? undefined}
            />
          )}

          {/* 结局操作按钮 */}
          {isEnding && !isTyping && showChoices && (
            <div className="mt-6 flex gap-3">
              <button
                onClick={restartStory}
                className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-medium flex items-center justify-center gap-2 btn-bounce hover:bg-gray-50"
              >
                <RotateCcw size={18} />
                再玩一次
              </button>
              <button
                onClick={exitStory}
                className="flex-1 py-3 bg-sky-500 text-white rounded-2xl font-medium flex items-center justify-center gap-2 btn-bounce hover:bg-sky-600"
              >
                回到故事列表
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
