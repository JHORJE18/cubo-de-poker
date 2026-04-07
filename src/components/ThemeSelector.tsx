import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../themes/useTheme";
import { themes } from "../themes/themes";
import styles from "./ThemeSelector.module.css";

const ThemeSelector: React.FC = () => {
  const { currentTheme, setThemeName } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        className={styles.toggleBtn}
        onClick={() => setOpen((prev) => !prev)}
        title="Cambiar tema"
        aria-label="Selector de tema"
        aria-expanded={open}
      >
        🎨
      </button>
      {open && (
        <div className={styles.dropdown}>
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={`${styles.themeOption} ${currentTheme.name === theme.name ? styles.active : ""}`}
              onClick={() => {
                setThemeName(theme.name);
                setOpen(false);
              }}
            >
              {currentTheme.name === theme.name ? "✓ " : ""}{theme.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
