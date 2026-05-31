import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tapovanam_dark_mode";

function getInitialDark(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true";
  } catch {
    // ignore
  }
  return false; // Default to light mode; user can switch via toggle
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(STORAGE_KEY, String(isDark));
    } catch {
      // ignore
    }
  }, [isDark]);

  const toggleDarkMode = useCallback(() => setIsDark((prev) => !prev), []);

  return { isDark, toggleDarkMode };
}
