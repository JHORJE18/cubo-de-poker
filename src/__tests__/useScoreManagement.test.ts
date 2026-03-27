import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { useScoreManagement } from '../hooks/useScoreManagement';
import { Jugador, Tirada } from '../types';

describe('useScoreManagement', () => {
    const makeJugadores = () => [
        new Jugador('Alice', [new Tirada({ as: 1 }), new Tirada()]),
        new Jugador('Bob', [new Tirada(), new Tirada({ k: 2 })]),
    ];

    let jugadores: Jugador[];
    let setJugadores: ReturnType<typeof vi.fn>;
    let setCurrentPlayer: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        jugadores = makeJugadores();
        setJugadores = vi.fn();
        setCurrentPlayer = vi.fn();
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    const renderScoreHook = (currentPlayer: Jugador | null) =>
        renderHook(() =>
            useScoreManagement(jugadores, setJugadores, currentPlayer, setCurrentPlayer)
        );

    it('llama a setJugadores con la lista actualizada al modificar una puntuación', () => {
        const { result } = renderScoreHook(jugadores[0]);

        act(() => {
            result.current.updateScore('Alice', 0, 'as', 5);
        });

        expect(setJugadores).toHaveBeenCalledOnce();
        const updated: Jugador[] = setJugadores.mock.calls[0][0];
        expect(updated[0].tiradas[0].as).toBe(5);
    });

    it('no modifica a los demás jugadores al actualizar uno', () => {
        const { result } = renderScoreHook(jugadores[0]);

        act(() => {
            result.current.updateScore('Alice', 0, 'as', 9);
        });

        const updated: Jugador[] = setJugadores.mock.calls[0][0];
        expect(updated[1].tiradas[1].k).toBe(2); // Bob sin cambios
    });

    it('guarda los datos en localStorage tras actualizar', () => {
        const { result } = renderScoreHook(jugadores[0]);

        act(() => {
            result.current.updateScore('Alice', 0, 'k', 3);
        });

        const stored = localStorage.getItem('cuboDePokerPartida');
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed[0].tiradas[0].k).toBe(3);
    });

    it('llama a setCurrentPlayer cuando se actualiza el jugador activo', () => {
        const { result } = renderScoreHook(jugadores[0]);

        act(() => {
            result.current.updateScore('Alice', 0, 'rojas', 4);
        });

        expect(setCurrentPlayer).toHaveBeenCalledOnce();
        const updatedPlayer: Jugador = setCurrentPlayer.mock.calls[0][0];
        expect(updatedPlayer.tiradas[0].rojas).toBe(4);
    });

    it('no llama a setCurrentPlayer cuando se actualiza un jugador diferente al activo', () => {
        const { result } = renderScoreHook(jugadores[0]); // currentPlayer = Alice

        act(() => {
            result.current.updateScore('Bob', 1, 'k', 9);
        });

        expect(setCurrentPlayer).not.toHaveBeenCalled();
    });

    it('no llama a setCurrentPlayer cuando currentPlayer es null', () => {
        const { result } = renderScoreHook(null);

        act(() => {
            result.current.updateScore('Alice', 0, 'as', 3);
        });

        expect(setCurrentPlayer).not.toHaveBeenCalled();
    });

    it('actualiza el campo correcto sin afectar los demás campos de la tirada', () => {
        jugadores[0].tiradas[0] = new Tirada({ as: 2, k: 3, q: 1 });
        const { result } = renderScoreHook(jugadores[0]);

        act(() => {
            result.current.updateScore('Alice', 0, 'k', 7);
        });

        const updated: Jugador[] = setJugadores.mock.calls[0][0];
        const tirada = updated[0].tiradas[0];
        expect(tirada.as).toBe(2); // sin cambios
        expect(tirada.k).toBe(7); // actualizado
        expect(tirada.q).toBe(1); // sin cambios
    });
});
