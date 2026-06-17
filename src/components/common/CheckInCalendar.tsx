import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Flame, Calendar, Trophy } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";

interface CheckInCalendarProps {
  open: boolean;
  onClose: () => void;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function computeLongestStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort();
  let longest = 1;
  let current = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = Math.round(
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else if (diff > 1) {
      current = 1;
    }
  }
  return longest;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

export default function CheckInCalendar({ open, onClose }: CheckInCalendarProps) {
  const { streakDays, longestStreak, getValidCheckInDates } = useUserStore();

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  const validDates = useMemo(() => {
    try {
      const dates = getValidCheckInDates();
      return new Set(dates);
    } catch {
      return new Set<string>();
    }
  }, [getValidCheckInDates]);

  const totalDays = validDates.size;
  const computedLongest = useMemo(() => {
    return computeLongestStreak(Array.from(validDates));
  }, [validDates]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const calendarDays = useMemo(() => {
    const days: { date: number; dateStr: string; isCurrentMonth: boolean }[] = [];

    const prevMonthDays = getDaysInMonth(
      viewMonth === 0 ? viewYear - 1 : viewYear,
      viewMonth === 0 ? 11 : viewMonth - 1
    );
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        dateStr: "",
        isCurrentMonth: false,
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      days.push({ date: d, dateStr, isCurrentMonth: true });
    }

    const remaining = 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      days.push({ date: d, dateStr: "", isCurrentMonth: false });
    }

    return days;
  }, [viewYear, viewMonth, daysInMonth, firstDay]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-card max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="sticky top-0 bg-white rounded-t-3xl z-10">
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 className="font-display text-xl text-warm-700 flex items-center gap-2">
              <Calendar size={22} className="text-warm-500" />
              签到日历
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-warm-50 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-warm-600" />
            </button>
            <span className="font-display text-lg text-warm-700">
              {viewYear}年{viewMonth + 1}月
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-warm-50 rounded-full transition-colors"
            >
              <ChevronRight size={20} className="text-warm-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((item, idx) => {
              if (!item.isCurrentMonth) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="aspect-square flex items-center justify-center text-sm text-gray-200"
                  />
                );
              }

              const isChecked = validDates.has(item.dateStr);
              const isToday = item.dateStr === todayStr;

              let cellClass = "aspect-square flex items-center justify-center text-sm rounded-xl transition-all ";
              let textClass = "";

              if (isToday && isChecked) {
                cellClass += "bg-warm-500 shadow-warm scale-110 ";
                textClass = "text-white font-bold";
              } else if (isToday) {
                cellClass += "bg-warm-100 ring-2 ring-warm-400 ";
                textClass = "text-warm-700 font-bold";
              } else if (isChecked) {
                cellClass += "bg-field-100 ";
                textClass = "text-field-700 font-medium";
              } else {
                cellClass += "hover:bg-gray-50 ";
                textClass = "text-gray-400";
              }

              return (
                <div key={item.dateStr} className={cellClass}>
                  <span className={textClass}>{item.date}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 mb-5 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-field-100 border border-field-200" />
              已签到
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-warm-100 border border-warm-300 ring-1 ring-warm-400" />
              今天
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
              未签到
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-warm-50 rounded-2xl p-3 text-center border border-warm-100">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame size={14} className="text-warm-500" />
                <span className="text-xs text-warm-600">连续签到</span>
              </div>
              <p className="text-xl font-bold text-warm-600">{streakDays}</p>
              <span className="text-xs text-warm-400">天</span>
            </div>
            <div className="bg-field-50 rounded-2xl p-3 text-center border border-field-100">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar size={14} className="text-field-500" />
                <span className="text-xs text-field-600">累计签到</span>
              </div>
              <p className="text-xl font-bold text-field-600">{totalDays}</p>
              <span className="text-xs text-field-400">天</span>
            </div>
            <div className="bg-wheat-50 rounded-2xl p-3 text-center border border-wheat-100">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy size={14} className="text-wheat-500" />
                <span className="text-xs text-wheat-600">最长连续</span>
              </div>
              <p className="text-xl font-bold text-wheat-600">
                {Math.max(longestStreak, computedLongest)}
              </p>
              <span className="text-xs text-wheat-400">天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
