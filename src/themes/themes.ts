export interface Theme {
  name: string;
  label: string;
  variables: Record<string, string>;
}

export const themes: Theme[] = [
  {
    name: "pipboy",
    label: "Pip-Boy",
    variables: {
      "--bg-color": "#001a00",
      "--text-color": "#00ff00",
      "--accent-color": "#00cc00",
      "--danger-color": "#ff3333",
      "--neutral-color": "#004d00",
      "--input-bg": "#001a00",
      "--border-color": "#004d00",
      "--hover-bg": "#00cc00",
      "--table-header-bg": "#004d00",
      "--select-bg": "#1c1c1c",
      "--disabled-text": "#6c757d",
    },
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    variables: {
      "--bg-color": "#0a0a2e",
      "--text-color": "#00d4ff",
      "--accent-color": "#ff00ff",
      "--danger-color": "#ff3366",
      "--neutral-color": "#1a1a4e",
      "--input-bg": "#0a0a2e",
      "--border-color": "#1a1a4e",
      "--hover-bg": "#ff00ff",
      "--table-header-bg": "#1a1a4e",
      "--select-bg": "#12123a",
      "--disabled-text": "#6c757d",
    },
  },
  {
    name: "clasico",
    label: "Clasico",
    variables: {
      "--bg-color": "#f5f5f0",
      "--text-color": "#333333",
      "--accent-color": "#2563eb",
      "--danger-color": "#dc2626",
      "--neutral-color": "#d1d5db",
      "--input-bg": "#ffffff",
      "--border-color": "#d1d5db",
      "--hover-bg": "#2563eb",
      "--table-header-bg": "#e5e7eb",
      "--select-bg": "#ffffff",
      "--disabled-text": "#9ca3af",
    },
  },
];

export const DEFAULT_THEME = "pipboy";
