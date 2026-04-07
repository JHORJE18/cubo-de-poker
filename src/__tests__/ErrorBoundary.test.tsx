import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../components/ErrorBoundary";

const ThrowError = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza los hijos cuando no hay error", () => {
    render(
      <ErrorBoundary>
        <div>Contenido normal</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Contenido normal")).toBeInTheDocument();
  });

  it("muestra mensaje de error cuando un hijo falla", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Algo ha salido mal")).toBeInTheDocument();
    expect(screen.getByText(/Recarga la pagina/i)).toBeInTheDocument();
  });

  it("muestra boton de recargar", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByRole("button", { name: /recargar/i })).toBeInTheDocument();
  });
});
