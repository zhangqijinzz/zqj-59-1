import { useState } from "react";
import { ArrowLeft, Plus, Compass, BookOpen, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ExploreCategory, CATEGORY_INFO } from "@/data/mockExplore";
import { useExploreStore } from "@/stores/useExploreStore";
import ExploreCard from "@/components/explore/ExploreCard";
import AddRecordForm from "@/components/explore/AddRecordForm";
import ItemDetail from "@/components/explore/ItemDetail";
import { ExploreItem } from "@/data/mockExplore";

type TabType = "all" | ExploreCategory;

export default function Explore() {
  const navigate = useNavigate();
  const { items, getStats } = useExploreStore();
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExploreItem | null>(null);

  const stats = getStats();

  const tabs: { key: TabType; label: string; icon?: string }[] = [
    { key: "all", label: "全部" },
    { key: "plant-animal", label: "动植物", icon: "🌿" },
    { key: "old-building", label: "老建筑", icon: "🏚️" },
    { key: "dialect", label: "方言童谣", icon: "🎵" },
  ];

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab);

  const showAddDialog = () => {
    if (activeTab === "all") {
      setActiveTab("plant-animal");
    }
    setShowAddForm(true);
  };

  const currentCategory =
    activeTab !== "all" ? activeTab : "plant-animal";

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* 添加记录弹窗 */}
      {showAddForm && (
        <AddRecordForm
          category={currentCategory}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {/* 详情弹窗 */}
      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* 头部 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-white rounded-full shadow-soft hover:bg-gray-50 btn-bounce"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="font-display text-2xl text-wheat-700">乡村探索图鉴</h1>
          <p className="text-sm text-gray-500">发现家乡的美好</p>
        </div>
        <button
          onClick={showAddDialog}
          className="p-3 bg-wheat-500 text-white rounded-full shadow-md btn-bounce hover:bg-wheat-600 flex items-center gap-1"
        >
          <Plus size={20} />
          <span className="hidden sm:inline font-medium">记录</span>
        </button>
      </div>

      {/* 乡村志概览卡片 */}
      <div className="bg-gradient-to-br from-wheat-400 via-warm-300 to-warm-400 rounded-3xl p-6 text-white shadow-card mb-6 relative overflow-hidden">
        {/* 装饰 */}
        <div className="absolute -right-4 -top-4 text-8xl opacity-20">📖</div>
        <div className="absolute -left-2 bottom-0 text-6xl opacity-15">🏞️</div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={24} />
            <span className="font-display text-xl">我的乡村志</span>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{stats.total}</div>
              <div className="text-xs text-white/80">总记录</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌿</div>
              <div className="text-xs text-white/80">
                {stats.byCategory["plant-animal"]}条
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏚️</div>
              <div className="text-xs text-white/80">
                {stats.byCategory["old-building"]}条
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🎵</div>
              <div className="text-xs text-white/80">
                {stats.byCategory["dialect"]}条
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Award size={16} />
            <span>继续探索，解锁更多家乡的秘密～</span>
          </div>
        </div>
      </div>

      {/* 分类 Tab */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const info = tab.key !== "all" ? CATEGORY_INFO[tab.key] : null;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all btn-bounce ${
                isActive
                  ? "bg-wheat-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-soft"
              }`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span className="text-sm">{tab.label}</span>
              {tab.key !== "all" && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {stats.byCategory[tab.key as ExploreCategory]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 图鉴列表 */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">
            {activeTab === "all" ? "📭" : CATEGORY_INFO[activeTab].icon}
          </div>
          <p className="text-gray-500 mb-2">
            还没有记录呢～
          </p>
          <p className="text-sm text-gray-400 mb-4">
            {activeTab === "all"
              ? "点击右上角的 + 号，开始记录家乡的美好吧"
              : `去记录一些${CATEGORY_INFO[activeTab].label}吧～`}
          </p>
          <button
            onClick={showAddDialog}
            className="inline-flex items-center gap-2 px-6 py-3 bg-wheat-500 text-white rounded-full font-medium btn-bounce hover:bg-wheat-600"
          >
            <Plus size={18} />
            添加第一条记录
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ExploreCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {/* 底部提示 */}
      {filteredItems.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            🌾 每一条记录，都是家乡的故事 🌾
          </p>
        </div>
      )}
    </div>
  );
}
