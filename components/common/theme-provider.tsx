"use client";

import * as React from "react";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme =
  | "blue"
  | "purple"
  | "orange"
  | "green"
  | "red"
  | "teal"
  | "indigo";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "blue",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  useEffect(() => {
    // Sync state from what the FOUC-prevention script already applied
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored && stored !== "blue") {
      setThemeState(stored);
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    // Briefly add transition class so the swap feels smooth
    document.documentElement.classList.add("theme-switching");
    setTimeout(() => {
      document.documentElement.classList.remove("theme-switching");
    }, 280);

    setThemeState(t);
    localStorage.setItem("portfolio-theme", t);

    if (t === "blue") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", t);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
