import React from "react";
import { useTheme } from "../themes/useTheme";
import { themes } from "../themes/themes";
import styles from "./ThemeSelector.module.css";

const ThemeSelector: React.FC = () => {
  const { currentTheme, setThemeName } = useTheme();

  return (
    <div className={styles.container}>
      {themes.map((theme) => (
        <button
          key={theme.name}
          className={`${styles.themeBtn} ${currentTheme.name === theme.name ? styles.active : ""}`}
          onClick={() => setThemeName(theme.name)}
          title={theme.label}
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
