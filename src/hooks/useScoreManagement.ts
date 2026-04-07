import { useRef } from 'react';
import { Jugador, Tirada } from '../types';

export const useScoreManagement = (
  jugadores: Jugador[],
  setJugadores: (jugadores: Jugador[]) => void,
  currentPlayer: Jugador | null,
  setCurrentPlayer: (player: Jugador | null) => void
) => {
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateScore = (playerName: string, index: number, field: keyof Tirada, value: number) => {
    const clampedValue = Math.max(0, Math.min(99, value));
    const updatedJugadores = jugadores.map((player) => {
      if (player.name === playerName) {
        const updatedTiradas = [...player.tiradas];
        if (updatedTiradas[index]) {
          updatedTiradas[index] = new Tirada({
            ...updatedTiradas[index],
            [field]: clampedValue,
          });
        }
        return new Jugador(player.name, updatedTiradas);
      }
      return player;
    });

    setJugadores(updatedJugadores);

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem("cuboDePokerPartida", JSON.stringify(updatedJugadores));
    }, 300);

    if (currentPlayer?.name === playerName) {
      const updatedTiradas = [...currentPlayer.tiradas];
      updatedTiradas[index] = new Tirada({
        ...updatedTiradas[index],
        [field]: clampedValue,
      });
      const updatedPlayer = new Jugador(currentPlayer.name, updatedTiradas);
      setCurrentPlayer(updatedPlayer);
    }
  };

  return { updateScore };
};
