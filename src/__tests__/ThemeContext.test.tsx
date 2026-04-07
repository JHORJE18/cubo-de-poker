import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../themes/ThemeContext";
import { useTheme } from "../themes/useTheme";
import { themes } from "../themes/themes";

const ThemeDisplay = () => {
  const { currentTheme, setThemeName } = useTheme();
  return (
    <div>
      <span data-testid="theme-name">{currentTheme.name}</span>
      {themes.map((t) => (
        <button key={t.name} onClick={() => setThemeName(t.name)}>
          {t.label}
        </button>
      ))}
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("usa el tema pipboy por defecto", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-name")).toHaveTextContent("pipboy");
  });

  it("cambia de tema al hacer click", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Cyberpunk"));
    expect(screen.getByTestId("theme-name")).toHaveTextContent("cyberpunk");
  });

  it("persiste el tema en localStorage", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Clasico"));
    expect(localStorage.getItem("cuboDePokerTheme")).toBe("clasico");
  });

  it("carga el tema guardado en localStorage", () => {
    localStorage.setItem("cuboDePokerTheme", "cyberpunk");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-name")).toHaveTextContent("cyberpunk");
  });

  it("aplica variables CSS al cambiar tema", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("Cyberpunk"));
    const bgColor = document.documentElement.style.getPropertyValue("--bg-color");
    expect(bgColor).toBe("#0a0a2e");
  });
});
