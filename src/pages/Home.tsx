import { useState, useEffect } from "react";
import { Bird, Sprout, Shield, Compass, Sparkles, Flame, Gift } from "lucide-react";
import GooseMascot from "@/components/common/GooseMascot";
import MoodPicker from "@/components/common/MoodPicker";
import FeatureCard from "@/components/common/FeatureCard";
import { useUserStore } from "@/stores/useUserStore";

const GREETINGS = [
  "早上好呀，今天也要开心哦！",
  "新的一天，充满了新的可能～",
  "宝贝，你今天过得怎么样？",
  "有什么好玩的事情想分享吗？",
  "记得多喝水，照顾好自己呀～",
];

export default function Home() {
  const { streakDays, checkIn, lastSignDate, addCoins } = useUserStore();
  const [greeting] = useState(
    () => GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
  );
  const [showCheckInSuccess, setShowCheckInSuccess] = useState(false);
  const [todayChecked, setTodayChecked] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTodayChecked(lastSignDate === today);
  }, [lastSignDate]);

  const handleCheckIn = () => {
    const success = checkIn();
    if (success) {
      setShowCheckInSuccess(true);
      setTodayChecked(true);
      setTimeout(() => setShowCheckInSuccess(false), 2000);
    }
  };

  const features = [
    {
      icon: <Bird size={28} />,
      title: "父母信使鸟",
      description: "说句话、画幅画，让小雁子带给爸爸妈妈～",
      color: "warm" as const,
      to: "/messenger",
    },
    {
      icon: <Sprout size={28} />,
      title: "农活小游戏",
      description: "和爸爸妈妈一起种庄稼，收获满满的快乐！",
      color: "field" as const,
      to: "/farm",
      badge: "亲子协作",
    },
    {
      icon: <Shield size={28} />,
      title: "安全守护剧情",
      description: "在故事里学习安全知识，做自己的小卫士～",
      color: "sky" as const,
      to: "/safety",
      badge: "互动学习",
    },
    {
      icon: <Compass size={28} />,
      title: "乡村探索图鉴",
      description: "发现家乡的美好，记录属于你的乡村志。",
      color: "wheat" as const,
      to: "/explore",
      badge: "即将上线",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 relative overflow-hidden">
      {/* 装饰元素 */}
      <div className="absolute top-10 right-0 text-6xl opacity-30 animate-float-slow pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-32 left-10 text-4xl opacity-20 animate-float pointer-events-none">
        ☁️
      </div>
      <div className="absolute bottom-40 right-20 text-3xl opacity-25 animate-float-slow pointer-events-none" style={{ animationDelay: "1s" }}>
        🐦
      </div>

      {/* 签到成功提示 */}
      {showCheckInSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-warm-500 text-white px-6 py-3 rounded-2xl shadow-warm flex items-center gap-2">
            <Gift size={20} />
            <span className="font-medium">签到成功！+{10 + (streakDays - 1) * 2} 金币</span>
          </div>
        </div>
      )}

      {/* 欢迎区域 */}
      <section className="text-center mb-8 sm:mb-12 animate-fade-in-up">
        <div className="mb-6">
          <GooseMascot size="lg" message={greeting} />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl text-warm-600 mb-3">
          欢迎回家 🏠
        </h1>
        <p className="text-gray-500 mb-6">
          这里是属于你的小天地，想爸爸妈妈了吗？
        </p>

        {/* 签到和连续天数 */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-soft">
            <Flame size={18} className="text-warm-500" />
            <span className="text-sm text-gray-600">
              已连续签到 <span className="font-bold text-warm-600">{streakDays}</span> 天
            </span>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={todayChecked}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all btn-bounce ${
              todayChecked
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-warm-500 text-white shadow-warm hover:bg-warm-600"
            }`}
          >
            <Sparkles size={18} />
            {todayChecked ? "今日已签到" : "每日签到"}
          </button>
        </div>

        {/* 心情选择 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 sm:p-6 shadow-soft max-w-lg mx-auto">
          <MoodPicker />
        </div>
      </section>

      {/* 功能卡片 */}
      <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="font-display text-xl sm:text-2xl text-gray-700 mb-5 flex items-center gap-2">
          <span>✨</span>
          想玩点什么呢？
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              className="animate-fade-in-up opacity-0"
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* 底部装饰 */}
      <div className="mt-12 text-center text-sm text-gray-400">
        <p>🌾 愿每一颗星星都照亮你回家的路 🌾</p>
      </div>
    </div>
  );
}
