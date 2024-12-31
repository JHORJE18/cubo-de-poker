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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && newPlayer.trim()) {
            addPlayer(newPlayer);
            const player = jugadores.find((p) => p.name === newPlayer.trim());
            if (player) {
                setCurrentPlayer(player);
            }
            setNewPlayer("");
        }
    };

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
                    onKeyDown={handleKeyDown} // Detectar Enter
                    placeholder="Nuevo jugador"
                />
                <button
                    className="btn-primary"
                    onClick={() => {
                        addPlayer(newPlayer);
                        const player = jugadores.find((p) => p.name === newPlayer.trim());
                        if (player) {
                            setCurrentPlayer(player);
                        }
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