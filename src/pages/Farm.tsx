import { useState, useEffect } from "react";
import { ArrowLeft, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FarmGrid from "@/components/farm/FarmGrid";
import Toolbar from "@/components/farm/Toolbar";
import StatusPanel from "@/components/farm/StatusPanel";
import SeedSelector from "@/components/farm/SeedSelector";
import { useFarmStore, ToolType } from "@/stores/useFarmStore";
import { useUserStore } from "@/stores/useUserStore";
import { Crop } from "@/data/mockCrops";

export default function Farm() {
  const navigate = useNavigate();
  const {
    plots,
    selectedTool,
    selectedCrop,
    parentActions,
    selectTool,
    selectCrop,
    plantSeed,
    waterPlot,
    fertilizePlot,
    harvestPlot,
    updateGrowth,
    addParentAction,
  } = useFarmStore();

  const { coins, spendCoins, addCoins, streakDays } = useUserStore();
  const [selectedPlotId, setSelectedPlotId] = useState<number | null>(null);
  const [showSeedSelector, setShowSeedSelector] = useState(false);
  const [showHarvestSuccess, setShowHarvestSuccess] = useState<{
    amount: number;
    crop: string;
  } | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      updateGrowth();
    }, 1000);
    return () => clearInterval(interval);
  }, [updateGrowth]);

  useEffect(() => {
    const parentInterval = setInterval(() => {
      const actions = [
        { action: "来田里看过你了", by: "爸爸" },
        { action: "给作物浇水了", by: "妈妈" },
        { action: "给你加油打气", by: "爸爸" },
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      addParentAction(randomAction.action, randomAction.by);
    }, 60000);

    return () => clearInterval(parentInterval);
  }, [addParentAction]);

  const handleToolSelect = (tool: ToolType) => {
    if (tool === selectedTool) {
      selectTool(null);
      selectCrop(null);
      setShowSeedSelector(false);
    } else {
      selectTool(tool);
      if (tool === "seed") {
        setShowSeedSelector(true);
      } else {
        setShowSeedSelector(false);
        selectCrop(null);
      }
    }
    setSelectedPlotId(null);
  };

  const handleCropSelect = (crop: Crop) => {
    selectCrop(crop);
    setShowSeedSelector(false);
  };

  const showMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 1500);
  };

  const handlePlotClick = (plotId: number) => {
    const plot = plots[plotId];

    if (!selectedTool) {
      setSelectedPlotId(plotId === selectedPlotId ? null : plotId);
      return;
    }

    switch (selectedTool) {
      case "seed":
        if (!selectedCrop) {
          showMessage("请先选择种子！");
          return;
        }
        if (plot.stage !== "empty") {
          showMessage("这块地已经有作物啦！");
          return;
        }
        if (!spendCoins(selectedCrop.seedPrice)) {
          showMessage("金币不够啦～");
          return;
        }
        plantSeed(plotId, selectedCrop.id);
        showMessage(`种下了${selectedCrop.name}！`);
        break;

      case "water":
        if (plot.stage === "empty") {
          showMessage("先种点东西吧～");
          return;
        }
        if (plot.stage === "mature") {
          showMessage("已经成熟啦，快去收获！");
          return;
        }
        if (plot.watered) {
          showMessage("已经浇过水啦～");
          return;
        }
        waterPlot(plotId);
        showMessage("浇水成功！💧");
        break;

      case "fertilizer":
        if (plot.stage === "empty") {
          showMessage("先种点东西吧～");
          return;
        }
        if (plot.stage === "mature") {
          showMessage("已经成熟啦，快去收获！");
          return;
        }
        if (plot.fertilized) {
          showMessage("已经施过肥啦～");
          return;
        }
        if (!spendCoins(15)) {
          showMessage("金币不够啦～");
          return;
        }
        fertilizePlot(plotId);
        showMessage("施肥成功！✨");
        break;

      case "harvest":
        if (plot.stage !== "mature") {
          showMessage("还没成熟呢，再等等～");
          return;
        }
        const earnings = harvestPlot(plotId);
        if (earnings > 0) {
          addCoins(earnings);
          setShowHarvestSuccess({ amount: earnings, crop: plot.crop! });
          setTimeout(() => setShowHarvestSuccess(null), 2000);
        }
        break;
    }

    setSelectedPlotId(plotId);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* 操作提示 */}
      {actionMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
          <div className="bg-field-500 text-white px-5 py-2 rounded-full shadow-field font-medium">
            {actionMessage}
          </div>
        </div>
      )}

      {/* 收获成功提示 */}
      {showHarvestSuccess && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-grow">
          <div className="bg-wheat-500 text-white px-8 py-4 rounded-3xl shadow-card text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-lg">收获成功！</p>
            <p className="text-wheat-100">+{showHarvestSuccess.amount} 金币</p>
          </div>
        </div>
      )}

      {/* 头部 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-white rounded-full shadow-soft hover:bg-gray-50 btn-bounce"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="font-display text-2xl text-field-600">我的小农田</h1>
          <p className="text-sm text-gray-500">和爸爸妈妈一起种庄稼～</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主游戏区 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 农田 */}
          <FarmGrid
            plots={plots}
            onPlotClick={handlePlotClick}
            selectedPlotId={selectedPlotId}
          />

          {/* 种子选择器 */}
          {showSeedSelector && (
            <SeedSelector
              onSelect={handleCropSelect}
              onClose={() => setShowSeedSelector(false)}
              coins={coins}
            />
          )}

          {/* 选中的种子 */}
          {selectedTool === "seed" && selectedCrop && (
            <div className="bg-white rounded-2xl shadow-soft p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedCrop.emoji}</span>
                <div>
                  <p className="font-medium text-gray-700">{selectedCrop.name}种子</p>
                  <p className="text-xs text-gray-400">
                    售价 {selectedCrop.sellPrice} 金币 · 生长时间约 {Math.round(selectedCrop.growTime / 1000)} 秒
                  </p>
                </div>
              </div>
              <div className="text-sm text-wheat-600 font-medium">
                💰 {selectedCrop.seedPrice}/颗
              </div>
            </div>
          )}

          {/* 工具栏 */}
          <Toolbar
            selectedTool={selectedTool}
            onSelectTool={handleToolSelect}
          />

          {/* 当前工具说明 */}
          {selectedTool && (
            <div className="bg-field-50 border border-field-200 rounded-2xl p-4">
              <p className="text-sm text-field-700">
                {selectedTool === "seed" && "💡 选择种子后，点击空地播种"}
                {selectedTool === "water" && "💡 点击未成熟的作物浇水，长得更快哦～"}
                {selectedTool === "fertilizer" && "💡 施肥需要 15 金币，作物生长加速 50%"}
                {selectedTool === "harvest" && "💡 点击成熟的作物收获金币"}
              </p>
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        <div className="lg:col-span-1">
          <StatusPanel
            coins={coins}
            streakDays={streakDays}
            parentActions={parentActions}
          />
        </div>
      </div>
    </div>
  );
}
