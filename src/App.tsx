import React, { useState } from "react";
import { Jugador } from "./types";
import "./index.css";

const App: React.FC = () => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Jugador | null>(null);

  const addPlayer = (name: string) => {
    // Quitar espacios al principio y al final
    const trimmedName = name.trim();

    // Validar nombre vacio
    if (!trimmedName) {
      alert("El nombre no puede estar vacío");
      return;
    }

    // Validar si ya existe el jugador
    if (jugadores.some((player) => player.name.toLowerCase() === trimmedName.toLowerCase())) {
      alert("El jugador ya existe");
      return;
    }

    // Validar longitud del nombre
    if (trimmedName.length < 2 || trimmedName.length > 20) {
      alert("El nombre debe tener entre 2 y 20 caracteres");
      return;
    }

    // Agregar jugador
    name = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
    setJugadores([...jugadores, new Jugador(name)]);
  };

  return (
    <div className="container">
      <header>
        <h1 className="main-title">Cubo de Poker</h1>
      </header>
      <div>
        <button onClick={() => addPlayer(prompt("Nombre del jugador:") || "")}>
          Añadir Jugador
        </button>
        <ul>
          {jugadores.map((jugador) => (
            <li key={jugador.name}>{jugador.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;