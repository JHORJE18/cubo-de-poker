import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Jugador, Tirada } from '../types';

describe('useLocalStorage', () => {
    let setJugadores: ReturnType<typeof vi.fn>;
    let setIsLoading: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        setJugadores = vi.fn();
        setIsLoading = vi.fn();
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('no llama a setJugadores cuando localStorage está vacío', () => {
        renderHook(() => useLocalStorage(setJugadores, setIsLoading));
        expect(setJugadores).not.toHaveBeenCalled();
    });

    it('carga y reconstruye los jugadores desde localStorage', () => {
        const datos = [
            { name: 'Alice', tiradas: [{ as: 3, k: 1, q: 0, j: 0, rojas: 0, negras: 0 }, { as: 0, k: 0, q: 0, j: 0, rojas: 0, negras: 0 }] },
        ];
        localStorage.setItem('cuboDePokerPartida', JSON.stringify(datos));

        renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        expect(setJugadores).toHaveBeenCalledOnce();
        const jugadores: Jugador[] = setJugadores.mock.calls[0][0];
        expect(jugadores).toHaveLength(1);
        expect(jugadores[0].name).toBe('Alice');
        expect(jugadores[0].tiradas[0].as).toBe(3);
    });

    it('reconstruye instancias de clase Jugador con el método getTotal', () => {
        const datos = [
            { name: 'Bob', tiradas: [{ as: 1, k: 0, q: 0, j: 0, rojas: 0, negras: 0 }, { as: 0, k: 0, q: 0, j: 0, rojas: 0, negras: 0 }] },
        ];
        localStorage.setItem('cuboDePokerPartida', JSON.stringify(datos));

        renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        const jugadores: Jugador[] = setJugadores.mock.calls[0][0];
        expect(jugadores[0]).toBeInstanceOf(Jugador);
        expect(jugadores[0].getTotal()).toBe(6); // as=1 → 1*6
    });

    it('reconstruye instancias de clase Tirada con el método getTotal', () => {
        const datos = [
            { name: 'Carol', tiradas: [{ as: 0, k: 2, q: 0, j: 0, rojas: 0, negras: 0 }, { as: 0, k: 0, q: 0, j: 0, rojas: 0, negras: 0 }] },
        ];
        localStorage.setItem('cuboDePokerPartida', JSON.stringify(datos));

        renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        const jugadores: Jugador[] = setJugadores.mock.calls[0][0];
        expect(jugadores[0].tiradas[0]).toBeInstanceOf(Tirada);
        expect(jugadores[0].tiradas[0].getTotal()).toBe(10); // k=2 → 2*5
    });

    it('oculta la pantalla de carga tras 1500ms', () => {
        renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        expect(setIsLoading).not.toHaveBeenCalled();

        act(() => { vi.advanceTimersByTime(1500); });

        expect(setIsLoading).toHaveBeenCalledWith(false);
    });

    it('no oculta la pantalla de carga antes de que pasen 1500ms', () => {
        renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        act(() => { vi.advanceTimersByTime(1499); });

        expect(setIsLoading).not.toHaveBeenCalled();
    });

    it('cancela el timer al desmontar el componente', () => {
        const { unmount } = renderHook(() => useLocalStorage(setJugadores, setIsLoading));

        unmount();
        act(() => { vi.advanceTimersByTime(1500); });

        expect(setIsLoading).not.toHaveBeenCalled();
    });
});
