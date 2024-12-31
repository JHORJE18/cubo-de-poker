import React, { useState } from "react";
import PlayerSection from "./components/PlayerSection";
import TiradasSection from "./components/TiradasSection";
import RankingSection from "./components/RankingSection";
import { Jugador, Tirada } from "./types";
import "./index.css";

const App: React.FC = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Jugador | null>(null);

  const addPlayer = (name: string) => {
    // Normalizar el nombre
    const normalizedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();

    // Validar si el nombre está vacío
    if (!normalizedName) {
      alert("El nombre del jugador no puede estar vacío.");
      return;
    }

    // Validar si el nombre ya existe (case-insensitive)
    if (jugadores.some((player) => player.name.toLowerCase() === normalizedName.toLowerCase())) {
      alert("Ya existe un jugador con ese nombre.");
      return;
    }

    // Validar la longitud del nombre
    if (normalizedName.length < 2 || normalizedName.length > 20) {
      alert("El nombre del jugador debe tener entre 2 y 20 caracteres.");
      return;
    }

    // Agregar el jugador si pasa todas las validaciones
    setJugadores([...jugadores, new Jugador(normalizedName)]);
  };

  const removePlayer = (name: string) => {
    setJugadores(jugadores.filter((player) => player.name !== name));
    if (currentPlayer?.name === name) {
      setCurrentPlayer(null);
    }
  };

  const updateScore = (playerName: string, round: 1 | 2, value: number) => {
    setJugadores((prevJugadores) =>
      prevJugadores.map((player) => {
        if (player.name === playerName) {
          if (round === 1) player.round1 = new Tirada(value);
          if (round === 2) player.round2 = new Tirada(value);
        }
        return player;
      })
    );
  };

  return (
    <div className="container">
      <header>
        <h1 className="main-title">Cubo de Poker</h1>
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
      <RankingSection jugadores={jugadores} />
    </div>
  );
};

export default App;