export function safeLoadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function safeSaveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // The app remains usable without localStorage.
  }
}

export function safeLoadString(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function safeSaveString(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The app remains usable without localStorage.
  }
}
