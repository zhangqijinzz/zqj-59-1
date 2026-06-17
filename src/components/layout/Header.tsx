import { Link, useLocation } from "react-router-dom";
import { Home, Bird, Sprout, Shield, Compass, Coins } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

export default function Header() {
  const location = useLocation();
  const { nickname, avatar, coins } = useUserStore();

  const navItems = [
    { path: "/", label: "首页", icon: Home },
    { path: "/messenger", label: "信使鸟", icon: Bird },
    { path: "/farm", label: "小农田", icon: Sprout },
    { path: "/safety", label: "安全故事", icon: Shield },
    { path: "/explore", label: "探索图鉴", icon: Compass },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-3xl animate-bounce-gentle">🐦</span>
            <span className="font-display text-xl text-warm-600 group-hover:text-warm-500 transition-colors">
              归雁
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all btn-bounce ${
                    isActive
                      ? "bg-warm-500 text-white shadow-warm"
                      : "text-gray-600 hover:bg-warm-50 hover:text-warm-600"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-wheat-100 px-3 py-1.5 rounded-full">
              <Coins size={18} className="text-wheat-500" />
              <span className="font-medium text-wheat-700 text-sm">{coins}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-field-100 rounded-full flex items-center justify-center text-xl">
                {avatar}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {nickname}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
