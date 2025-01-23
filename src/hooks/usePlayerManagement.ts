import { useState } from 'react';
import { Jugador } from '../types';

export const usePlayerManagement = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Jugador | null>(null);

  const addPlayer = (name: string) => {
    const normalizedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    if (!jugadores.find((player) => player.name.toLowerCase() === normalizedName.toLowerCase())) {
      setJugadores([...jugadores, new Jugador(normalizedName)]);
      currentPlayer === null && setCurrentPlayer(new Jugador(normalizedName));
    } else {
      alert("Ya existe un jugador con ese nombre.");
    }
  };

  const removePlayer = (name: string) => {
    const player = jugadores.find((player) => player.name === name);

    if (player) {
      const hasNonZeroScores = player.tiradas.some((tirada) => {
        return (
          tirada.as > 0 ||
          tirada.k > 0 ||
          tirada.q > 0 ||
          tirada.j > 0 ||
          tirada.rojas > 0 ||
          tirada.negras > 0
        );
      });

      if (hasNonZeroScores) {
        const confirmDelete = window.confirm(
          `El jugador "${name}" tiene valores registrados en sus tiradas. ¿Estás seguro de que deseas eliminarlo?`
        );
        if (!confirmDelete) return;
      }

      setJugadores(jugadores.filter((player) => player.name !== name));
      if (currentPlayer?.name === name) {
        setCurrentPlayer(null);
      }
    }
  };

  return {
    jugadores,
    setJugadores,
    currentPlayer,
    setCurrentPlayer,
    addPlayer,
    removePlayer,
  };
};