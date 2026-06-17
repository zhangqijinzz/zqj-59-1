import { create } from "zustand";
import { getStorage, setStorage, getTodayString } from "@/utils/storage";

interface UserState {
  nickname: string;
  avatar: string;
  coins: number;
  mood: string | null;
  streakDays: number;
  lastSignDate: string | null;
  safetyBadges: string[];
  setNickname: (name: string) => void;
  setMood: (mood: string) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  checkIn: () => boolean;
  addSafetyBadge: (badge: string) => void;
  hasBadge: (badge: string) => boolean;
}

const initialState = {
  nickname: "小燕子",
  avatar: "🐦",
  coins: 100,
  mood: null,
  streakDays: 3,
  lastSignDate: null,
  safetyBadges: [] as string[],
};

function loadFromStorage(): Partial<UserState> {
  const saved = getStorage<Partial<UserState>>("user", {});
  return saved;
}

function saveToStorage(state: Partial<UserState>) {
  setStorage("user", state);
}

export const useUserStore = create<UserState>((set, get) => {
  const saved = loadFromStorage();
  const state = { ...initialState, ...saved };

  return {
    ...state,

    setNickname: (name) => {
      set({ nickname: name });
      saveToStorage({ ...get(), nickname: name });
    },

    setMood: (mood) => {
      set({ mood });
      saveToStorage({ ...get(), mood });
    },

    addCoins: (amount) => {
      const newCoins = get().coins + amount;
      set({ coins: newCoins });
      saveToStorage({ ...get(), coins: newCoins });
    },

    spendCoins: (amount) => {
      if (get().coins < amount) return false;
      const newCoins = get().coins - amount;
      set({ coins: newCoins });
      saveToStorage({ ...get(), coins: newCoins });
      return true;
    },

    checkIn: () => {
      const today = getTodayString();
      const lastSign = get().lastSignDate;

      if (lastSign === today) return false;

      let newStreak = get().streakDays;
      if (lastSign) {
        const lastDate = new Date(lastSign);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      const bonusCoins = 10 + (newStreak - 1) * 2;
      const newCoins = get().coins + bonusCoins;

      set({
        lastSignDate: today,
        streakDays: newStreak,
        coins: newCoins,
      });

      saveToStorage({
        ...get(),
        lastSignDate: today,
        streakDays: newStreak,
        coins: newCoins,
      });

      return true;
    },

    addSafetyBadge: (badge) => {
      if (get().safetyBadges.includes(badge)) return;
      const badges = [...get().safetyBadges, badge];
      set({ safetyBadges: badges });
      saveToStorage({ ...get(), safetyBadges: badges });
    },

    hasBadge: (badge) => {
      return get().safetyBadges.includes(badge);
    },
  };
});
