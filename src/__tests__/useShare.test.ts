import { renderHook } from "@testing-library/react";
import { useShare } from "../hooks/useShare";
import { Jugador, Tirada } from "../types";

describe("useShare", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("genera texto de ranking correcto y copia al portapapeles", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
      share: undefined,
    });

    const jugadores = [
      new Jugador("Alice", [new Tirada({ as: 2 }), new Tirada()]),
      new Jugador("Bob", [new Tirada({ as: 3 }), new Tirada()]),
    ];

    const { result } = renderHook(() => useShare());
    const msg = await result.current.shareResults(jugadores);

    expect(writeText).toHaveBeenCalled();
    const text = writeText.mock.calls[0][0] as string;
    expect(text).toContain("Cubo de Poker - Ranking");
    expect(text).toContain("Bob");
    expect(text).toContain("Alice");
    expect(msg).toBe("Copiado al portapapeles");
  });

  it("usa Web Share API cuando esta disponible", async () => {
    const shareFn = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share: shareFn });

    const jugadores = [new Jugador("Alice")];
    const { result } = renderHook(() => useShare());
    const msg = await result.current.shareResults(jugadores);

    expect(shareFn).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Cubo de Poker" })
    );
    expect(msg).toBe("Compartido correctamente");
  });

  it("retorna mensaje vacio si el usuario cancela compartir", async () => {
    const abortError = new DOMException("User cancelled", "AbortError");
    Object.assign(navigator, {
      share: vi.fn().mockRejectedValue(abortError),
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    const jugadores = [new Jugador("Alice")];
    const { result } = renderHook(() => useShare());
    const msg = await result.current.shareResults(jugadores);

    expect(msg).toBe("");
  });
});
