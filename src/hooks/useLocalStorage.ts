import { useEffect } from 'react';
import { Jugador, Tirada } from '../types';

export const useLocalStorage = (
  setJugadores: (jugadores: Jugador[]) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  useEffect(() => {
    const savedData = localStorage.getItem("cuboDePokerPartida");
    if (savedData) {
      const parsedData: Jugador[] = JSON.parse(savedData).map((player: Jugador) => {
        return new Jugador(
          player.name,
          player.tiradas.map((tirada) => new Tirada(tirada))
        );
      });
      setJugadores(parsedData);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setJugadores, setIsLoading]);
};