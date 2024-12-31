import React, { useState } from "react";
import { Jugador } from "../types";

interface PlayerSectionProps {
    jugadores: Jugador[];
    currentPlayer: Jugador | null;
    setCurrentPlayer: (player: Jugador | null) => void;
    addPlayer: (name: string) => void;
    removePlayer: (name: string) => void;
}

const PlayerSection: React.FC<PlayerSectionProps> = ({
    jugadores,
    currentPlayer,
    setCurrentPlayer,
    addPlayer,
    removePlayer,
}) => {
    const [newPlayer, setNewPlayer] = useState("");

    return (
        <section>
            <h2>Gestión de Jugadores</h2>
            <div className="player-controls">
                <select
                    id="player-select"
                    value={currentPlayer?.name || ""}
                    onChange={(e) =>
                        setCurrentPlayer(
                            jugadores.find((player) => player.name === e.target.value) || null
                        )
                    }
                >
                    <option value="" disabled>
                        Selecciona un jugador
                    </option>
                    {jugadores.map((player) => (
                        <option key={player.name} value={player.name}>
                            {player.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="player-buttons">
                <input
                    type="text"
                    value={newPlayer}
                    onChange={(e) => setNewPlayer(e.target.value)}
                    placeholder="Nuevo jugador"
                />
                <button
                    className="btn-primary"
                    onClick={() => {
                        addPlayer(newPlayer);
                        setNewPlayer("");
                    }}
                    disabled={!newPlayer.trim()} // Desactiva el botón si el input está vacío
                >
                    Añadir jugador
                </button>
                <button
                    className="btn-danger"
                    onClick={() => {
                        if (currentPlayer) removePlayer(currentPlayer.name);
                    }}
                >
                    Eliminar jugador
                </button>
            </div>
        </section>
    );
};

export default PlayerSection;