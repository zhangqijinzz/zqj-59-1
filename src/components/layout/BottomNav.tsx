import { Link, useLocation } from "react-router-dom";
import { Home, Bird, Sprout, Shield, Compass } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "首页", icon: Home },
    { path: "/messenger", label: "信使鸟", icon: Bird },
    { path: "/farm", label: "农田", icon: Sprout },
    { path: "/safety", label: "安全", icon: Shield },
    { path: "/explore", label: "探索", icon: Compass },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 md:hidden z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                isActive
                  ? "text-warm-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon size={22} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
