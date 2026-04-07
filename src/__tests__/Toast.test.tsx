import { render, screen, act } from "@testing-library/react";
import Toast from "../components/Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("muestra el mensaje", () => {
    render(<Toast message="Test message" onClose={() => {}} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("llama a onClose despues del timeout", () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} duration={1000} />);

    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("usa duracion por defecto de 2500ms", () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(2400);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(onClose).toHaveBeenCalled();
  });
});
