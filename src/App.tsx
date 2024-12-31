import React, { useEffect, useState } from "react";
import PlayerSection from "./components/PlayerSection";
import TiradasSection from "./components/TiradasSection";
import RankingSection from "./components/RankingSection";
import { Jugador, Tirada } from "./types";
import "./index.css";
import SplashScreen from "./components/SplashScreen";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Jugador | null>(null);

  useEffect(() => {
    // Simula una carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Cambiar el tiempo según sea necesario

    return () => clearTimeout(timer);
  }, []);

  // Añadir un nuevo jugador
  const addPlayer = (name: string) => {
    const normalizedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
    if (!jugadores.find((player) => player.name.toLowerCase() === normalizedName.toLowerCase())) {
      setJugadores([...jugadores, new Jugador(normalizedName)]);
      currentPlayer === null && setCurrentPlayer(new Jugador(normalizedName));
    } else {
      alert("Ya existe un jugador con ese nombre.");
    }
  };

  // Eliminar un jugador
  const removePlayer = (name: string) => {
    const player = jugadores.find((player) => player.name === name);

    if (player) {
      // Verifica si alguna tirada tiene valores diferentes de 0
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

      // Si hay valores diferentes de 0, solicita confirmación
      if (hasNonZeroScores) {
        const confirmDelete = window.confirm(
          `El jugador "${name}" tiene valores registrados en sus tiradas. ¿Estás seguro de que deseas eliminarlo?`
        );
        if (!confirmDelete) {
          return; // Cancela la eliminación si el usuario no confirma
        }
      }

      // Elimina al jugador
      setJugadores(jugadores.filter((player) => player.name !== name));

      // Si el jugador actual es el eliminado, resetea el jugador actual
      if (currentPlayer?.name === name) {
        setCurrentPlayer(null);
      }
    }
  };

  const updateScore = (playerName: string, index: number, field: keyof Tirada, value: number) => {
    setJugadores((prevJugadores) =>
      prevJugadores.map((player) => {
        if (player.name === playerName) {
          const updatedTiradas = [...player.tiradas];

          // Si la tirada ya existe, actualízala
          if (updatedTiradas[index]) {
            updatedTiradas[index] = new Tirada({
              ...updatedTiradas[index],
              [field]: value,
            });
          }

          return new Jugador(player.name, updatedTiradas);
        }
        return player;
      })
    );

    // Actualiza el jugador actual si corresponde
    if (currentPlayer?.name === playerName) {
      setCurrentPlayer((prev) => {
        if (!prev) return null;
        const updatedTiradas = [...prev.tiradas];
        updatedTiradas[index] = new Tirada({
          ...updatedTiradas[index],
          [field]: value,
        });
        return new Jugador(prev.name, updatedTiradas);
      });
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="main-title">Cubo de Poker 🎲</h1>
      </header>
      <PlayerSection
        jugadores={jugadores}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        addPlayer={addPlayer}
        removePlayer={removePlayer}
      />
      <TiradasSection
        currentPlayer={currentPlayer}
        updateScore={updateScore}
      />
      <RankingSection
        jugadores={jugadores}
        setCurrentPlayer={setCurrentPlayer}
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default App;