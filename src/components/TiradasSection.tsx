import React from "react";
import { Jugador } from "../types";

interface TiradasSectionProps {
    currentPlayer: Jugador | null;
    updateScore: (playerName: string, round: 1 | 2, value: number) => void;
}

const TiradasSection: React.FC<TiradasSectionProps> = ({
    currentPlayer,
    updateScore,
}) => {
    if (!currentPlayer) {
        return <p>Por favor, selecciona un jugador para registrar tiradas.</p>;
    }

    return (
        <section>
            <h2>Registro de Tiradas</h2>
            <div className="tiradas-container">
                <div className="ronda">
                    <h3>Ronda 1</h3>
                    <input
                        type="number"
                        value={currentPlayer.round1.getTotal()}
                        onChange={(e) =>
                            updateScore(
                                currentPlayer.name,
                                1,
                                parseInt(e.target.value) || 0
                            )
                        }
                    />
                </div>
                <div className="ronda">
                    <h3>Ronda 2</h3>
                    <input
                        type="number"
                        value={currentPlayer.round2.getTotal()}
                        onChange={(e) =>
                            updateScore(
                                currentPlayer.name,
                                2,
                                parseInt(e.target.value) || 0
                            )
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default TiradasSection;