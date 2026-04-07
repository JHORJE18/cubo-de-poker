import React, { useState } from "react";
import PlayerSection from "./components/PlayerSection";
import TiradasSection from "./components/TiradasSection";
import RankingSection from "./components/RankingSection";
import SplashScreen from "./components/SplashScreen";
import ErrorBoundary from "./components/ErrorBoundary";
import ThemeSelector from "./components/ThemeSelector";
import { usePlayerManagement } from "./hooks/usePlayerManagement";
import { useScoreManagement } from "./hooks/useScoreManagement";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./index.css";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    jugadores,
    setJugadores,
    currentPlayer,
    setCurrentPlayer,
    addPlayer,
    removePlayer,
  } = usePlayerManagement();
  const { updateScore } = useScoreManagement(jugadores, setJugadores, currentPlayer, setCurrentPlayer);

  useLocalStorage(setJugadores, setIsLoading);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ErrorBoundary>
      <div className="container">
        <header className="app-header">
          <h1 className="main-title">Cubo de Poker 🎲</h1>
          <ThemeSelector />
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
        <div className="btn-container">
          {jugadores.length > 0 && (
            <button
              className="btn-nuclear"
              onClick={() => {
                if (window.confirm("¡Advertencia! Esto eliminará todos los datos. ¿Deseas continuar?")) {
                  localStorage.removeItem("cuboDePokerPartida");
                  setJugadores([]);
                  setCurrentPlayer(null);
                }
              }}>
              Destruir partida
            </button>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;