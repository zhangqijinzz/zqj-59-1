const STORAGE_PREFIX = "guiyan_";

export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage set error:", e);
  }
}

export function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (e) {
    console.error("Storage get error:", e);
    return defaultValue;
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (e) {
    console.error("Storage remove error:", e);
  }
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
