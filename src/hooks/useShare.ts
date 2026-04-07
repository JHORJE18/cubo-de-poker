import { RefObject } from "react";
import html2canvas from "html2canvas";
import { Jugador } from "../types";

export const useShare = () => {
  const shareResults = async (jugadores: Jugador[]): Promise<string> => {
    const sorted = [...jugadores].sort((a, b) => b.getTotal() - a.getTotal());
    const text = [
      "Cubo de Poker - Ranking",
      ...sorted.map(
        (j, i) => `${i + 1}. ${j.name} - ${j.getTotal()} pts`
      ),
    ].join("\n");

    if (navigator.share) {
      try {
        await navigator.share({ title: "Cubo de Poker", text });
        return "Compartido correctamente";
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return "";
        }
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      return "Copiado al portapapeles";
    } catch {
      return "No se pudo compartir";
    }
  };

  const captureScreenshot = async (
    elementRef: RefObject<HTMLElement | null>
  ): Promise<string> => {
    if (!elementRef.current) return "No se encontro el elemento";

    try {
      const canvas = await html2canvas(elementRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) return "Error al generar la imagen";

      if (navigator.share && navigator.canShare?.({ files: [new File([blob], "ranking.png", { type: "image/png" })] })) {
        const file = new File([blob], "cubo-de-poker-ranking.png", { type: "image/png" });
        await navigator.share({ files: [file], title: "Cubo de Poker - Ranking" });
        return "Compartido correctamente";
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cubo-de-poker-ranking.png";
      link.click();
      URL.revokeObjectURL(url);
      return "Captura descargada";
    } catch {
      return "Error al capturar pantalla";
    }
  };

  return { shareResults, captureScreenshot };
};
