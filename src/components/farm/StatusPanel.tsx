import { Coins, Clock, Users } from "lucide-react";

interface StatusPanelProps {
  coins: number;
  streakDays: number;
  parentActions: { time: string; action: string; by: string }[];
}

export default function StatusPanel({
  coins,
  streakDays,
  parentActions,
}: StatusPanelProps) {
  return (
    <div className="space-y-3">
      {/* 金币 */}
      <div className="bg-white rounded-2xl shadow-soft p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-wheat-100 rounded-xl">
            <Coins size={24} className="text-wheat-500" />
          </div>
          <div>
            <p className="text-xs text-gray-500">我的金币</p>
            <p className="text-xl font-bold text-wheat-600">{coins}</p>
          </div>
        </div>
      </div>

      {/* 亲子协作记录 */}
      <div className="bg-white rounded-2xl shadow-soft p-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-warm-500" />
          <span className="font-medium text-gray-700 text-sm">爸爸妈妈的动态</span>
        </div>
        <div className="space-y-2">
          {parentActions.slice(0, 3).map((action, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm bg-warm-50 p-2 rounded-xl"
            >
              <span className="text-lg">👨👩</span>
              <div className="flex-1">
                <p className="text-gray-700">
                  {action.by} {action.action}
                </p>
                <p className="text-xs text-gray-400">{action.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 小提示 */}
      <div className="bg-field-50 rounded-2xl p-4 border border-field-200">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm text-field-700 font-medium">小技巧</p>
            <p className="text-xs text-field-600 mt-1">
              浇水和施肥可以让作物长得更快哦～成熟的作物会闪闪发光！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
