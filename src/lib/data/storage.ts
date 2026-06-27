const PREFIX = "avanti_";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readFromStorage<T>(key: string, seed: T): T {
  if (!isBrowser()) return seed;
  const raw = window.localStorage.getItem(PREFIX + key);
  if (!raw) {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

export function writeToStorage<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
}
