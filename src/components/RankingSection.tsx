import React, { useRef, useState, useMemo } from "react";
import { Jugador } from "../types";
import { useShare } from "../hooks/useShare";
import Toast from "./Toast";
import styles from "./RankingSection.module.css";

interface RankingSectionProps {
    jugadores: Jugador[];
    currentPlayer: Jugador | null;
    setCurrentPlayer: (player: Jugador | null) => void;
}

const RankingSection: React.FC<RankingSectionProps> = ({ jugadores, currentPlayer, setCurrentPlayer }) => {
    const rankingRef = useRef<HTMLDivElement>(null);
    const [toastMessage, setToastMessage] = useState("");
    const { shareResults, captureScreenshot } = useShare();

    const sortedJugadores = useMemo(() =>
        [...jugadores].sort((a, b) => {
            const totalA = (a.tiradas[0]?.getTotal() || 0) + (a.tiradas[1]?.getTotal() || 0);
            const totalB = (b.tiradas[0]?.getTotal() || 0) + (b.tiradas[1]?.getTotal() || 0);
            return totalB - totalA;
        }),
        [jugadores]
    );

    const handleShare = async () => {
        const msg = await shareResults(jugadores);
        if (msg) setToastMessage(msg);
    };

    const handleCapture = async () => {
        const msg = await captureScreenshot(rankingRef);
        if (msg) setToastMessage(msg);
    };

    return (
        <section>
            <h2>Ranking de Jugadores</h2>
            <div ref={rankingRef}>
                <table className={styles.rankingTable}>
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
                                    className={currentPlayer?.name === jugador.name ? styles.selectedRow : ""}
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
            </div>
            {jugadores.length > 0 && (
                <div className={styles.shareButtons}>
                    <button className="btn-primary" onClick={handleShare}>
                        Compartir
                    </button>
                    <button className="btn-primary" onClick={handleCapture}>
                        Captura
                    </button>
                </div>
            )}
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage("")} />
            )}
        </section>
    );
};

export default RankingSection;
