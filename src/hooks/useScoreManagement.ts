import { Jugador, Tirada } from '../types';

export const useScoreManagement = (
  jugadores: Jugador[],
  setJugadores: (jugadores: Jugador[]) => void,
  currentPlayer: Jugador | null,
  setCurrentPlayer: (player: Jugador | null) => void
) => {
  const updateScore = (playerName: string, index: number, field: keyof Tirada, value: number) => {
    const updatedJugadores = jugadores.map((player) => {
      if (player.name === playerName) {
        const updatedTiradas = [...player.tiradas];
        if (updatedTiradas[index]) {
          updatedTiradas[index] = new Tirada({
            ...updatedTiradas[index],
            [field]: value,
          });
        }
        return new Jugador(player.name, updatedTiradas);
      }
      return player;
    });

    setJugadores(updatedJugadores);
    localStorage.setItem("cuboDePokerPartida", JSON.stringify(updatedJugadores));

    if (currentPlayer?.name === playerName) {
      const updatedTiradas = [...currentPlayer.tiradas];
      updatedTiradas[index] = new Tirada({
        ...updatedTiradas[index],
        [field]: value,
      });
      const updatedPlayer = new Jugador(currentPlayer.name, updatedTiradas);
      setCurrentPlayer(updatedPlayer);
    }
  };

  return { updateScore };
};