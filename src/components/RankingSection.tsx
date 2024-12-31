import React from "react";
import { Jugador } from "../types";

interface RankingSectionProps {
    jugadores: Jugador[];
    currentPlayer: Jugador | null;
    setCurrentPlayer: (player: Jugador | null) => void;
}

const RankingSection: React.FC<RankingSectionProps> = ({ jugadores, currentPlayer, setCurrentPlayer }) => {
    // Ordenar jugadores por puntuación total
    const sortedJugadores = [...jugadores].sort((a, b) => {
        const totalA = (a.tiradas[0]?.getTotal() || 0) + (a.tiradas[1]?.getTotal() || 0);
        const totalB = (b.tiradas[0]?.getTotal() || 0) + (b.tiradas[1]?.getTotal() || 0);
        return totalB - totalA; // Orden descendente
    });

    return (
        <section>
            <h2>Ranking de Jugadores</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Puntos Ronda 1</th>
                        <th>Puntos Ronda 2</th>
                        <th>Puntos Totales</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedJugadores.map((jugador, index) => {
                        const totalRound1 = jugador.tiradas[0]?.getTotal() || 0;
                        const totalRound2 = jugador.tiradas[1]?.getTotal() || 0;

                        return (
                            <tr
                                key={jugador.name}
                                className={currentPlayer?.name === jugador.name ? "selected-row" : ""}
                                onClick={() => setCurrentPlayer(jugador)}
                            >
                                <td>{index + 1}</td>
                                <td>{jugador.name}</td>
                                <td>{totalRound1}</td>
                                <td>{totalRound2}</td>
                                <td>{totalRound1 + totalRound2}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default RankingSection;