import React from "react";
import { Jugador } from "../types";

interface TiradasSectionProps {
    currentPlayer: Jugador | null;
    updateScore: (playerName: string, round: number, field: keyof Jugador["tiradas"][0], value: number) => void;
}

const TiradasSection: React.FC<TiradasSectionProps> = ({ currentPlayer, updateScore }) => {
    if (!currentPlayer) {
        return <p>Por favor, selecciona un jugador para registrar tiradas.</p>;
    }

    const handleInputChange = (round: number, field: keyof Jugador["tiradas"][0]) => (e: React.ChangeEvent<HTMLInputElement>) => {
        updateScore(currentPlayer.name, round - 1, field, parseInt(e.target.value) || 0);
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select(); // Selecciona todo el contenido del input al enfocarse
    };

    const renderInputs = (round: number) => (
        <div className="inputs">
            <label>
                As:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.as || 0}
                    onChange={handleInputChange(round, "as")}
                    onFocus={handleInputFocus}
                />
            </label>
            <label>
                K:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.k || 0}
                    onChange={handleInputChange(round, "k")}
                    onFocus={handleInputFocus}
                />
            </label>
            <label>
                Q:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.q || 0}
                    onChange={handleInputChange(round, "q")}
                    onFocus={handleInputFocus}
                />
            </label>
            <label>
                J:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.j || 0}
                    onChange={handleInputChange(round, "j")}
                    onFocus={handleInputFocus}
                />
            </label>
            <label>
                Rojas:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.rojas || 0}
                    onChange={handleInputChange(round, "rojas")}
                    onFocus={handleInputFocus}
                />
            </label>
            <label>
                Negras:
                <input
                    type="number"
                    max="99"
                    value={currentPlayer.tiradas[round - 1]?.negras || 0}
                    onChange={handleInputChange(round, "negras")}
                    onFocus={handleInputFocus}
                />
            </label>
        </div>
    );

    return (
        <section>
            <h2>Registro de Tiradas</h2>
            <div className="tiradas-container">
                <div className="ronda">
                    <h3>Ronda 1</h3>
                    {renderInputs(1)}
                </div>
                <div className="ronda">
                    <h3>Ronda 2</h3>
                    {renderInputs(2)}
                </div>
            </div>
        </section>
    );
};

export default TiradasSection;