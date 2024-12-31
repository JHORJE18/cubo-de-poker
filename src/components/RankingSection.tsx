import React from "react";
import { Jugador } from "../types";

interface RankingSectionProps {
    jugadores: Jugador[];
}

const RankingSection: React.FC<RankingSectionProps> = ({ jugadores }) => {
    const rankings = jugadores
        .map((player) => ({
            name: player.name,
            total: player.getTotal(),
        }))
        .sort((a, b) => b.total - a.total);

    return (
        <section>
            <h2>Tabla de Posiciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Jugador</th>
                        <th>Puntuación Total</th>
                    </tr>
                </thead>
                <tbody>
                    {rankings.map((rank, index) => (
                        <tr key={rank.name}>
                            <td>{index + 1}</td>
                            <td>{rank.name}</td>
                            <td>{rank.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default RankingSection;