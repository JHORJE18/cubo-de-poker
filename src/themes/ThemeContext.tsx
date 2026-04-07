import React, { createContext, useState, useEffect } from "react";
import { themes, DEFAULT_THEME, Theme } from "./themes";

export interface ThemeContextType {
  currentTheme: Theme;
  setThemeName: (name: string) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themeName, setThemeNameState] = useState<string>(() => {
    try {
      return localStorage.getItem("cuboDePokerTheme") || DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  });

  const currentTheme = themes.find((t) => t.name === themeName) || themes[0];

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setThemeName = (name: string) => {
    setThemeNameState(name);
    try {
      localStorage.setItem("cuboDePokerTheme", name);
    } catch {
      console.error("No se pudo guardar el tema en localStorage");
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
