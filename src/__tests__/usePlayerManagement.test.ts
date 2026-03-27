import { renderHook, act } from '@testing-library/react';
import { vi, beforeEach, afterEach } from 'vitest';
import { usePlayerManagement } from '../hooks/usePlayerManagement';

describe('usePlayerManagement', () => {
    beforeEach(() => {
        vi.spyOn(window, 'alert').mockImplementation(() => {});
        vi.spyOn(window, 'confirm').mockImplementation(() => true);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('addPlayer', () => {
        it('añade un jugador correctamente', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('Alice');
            });

            expect(result.current.jugadores).toHaveLength(1);
            expect(result.current.jugadores[0].name).toBe('Alice');
        });

        it('normaliza el nombre: primera letra mayúscula, resto minúsculas', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('aLICE');
            });

            expect(result.current.jugadores[0].name).toBe('Alice');
        });

        it('elimina los espacios al inicio y al final del nombre', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('  bob  ');
            });

            expect(result.current.jugadores[0].name).toBe('Bob');
        });

        it('selecciona automáticamente el primer jugador añadido como currentPlayer', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('Alice');
            });

            expect(result.current.currentPlayer?.name).toBe('Alice');
        });

        it('no cambia currentPlayer al añadir un segundo jugador', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('Alice');
            });
            act(() => {
                result.current.addPlayer('Bob');
            });

            expect(result.current.jugadores).toHaveLength(2);
            expect(result.current.currentPlayer?.name).toBe('Alice');
        });

        it('impide añadir un jugador duplicado (insensible a mayúsculas) y muestra alerta', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => {
                result.current.addPlayer('Alice');
            });
            act(() => {
                result.current.addPlayer('alice');
            });

            expect(result.current.jugadores).toHaveLength(1);
            expect(window.alert).toHaveBeenCalledOnce();
        });
    });

    describe('removePlayer', () => {
        it('elimina un jugador sin puntuación sin pedir confirmación', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            act(() => { result.current.removePlayer('Alice'); });

            expect(result.current.jugadores).toHaveLength(0);
            expect(window.confirm).not.toHaveBeenCalled();
        });

        it('pide confirmación antes de eliminar un jugador con puntuación', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            act(() => {
                result.current.jugadores[0].tiradas[0].as = 5;
            });
            act(() => { result.current.removePlayer('Alice'); });

            expect(window.confirm).toHaveBeenCalledOnce();
        });

        it('no elimina al jugador si el usuario cancela la confirmación', () => {
            vi.spyOn(window, 'confirm').mockReturnValue(false);
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            act(() => {
                result.current.jugadores[0].tiradas[0].as = 5;
            });
            act(() => { result.current.removePlayer('Alice'); });

            expect(result.current.jugadores).toHaveLength(1);
        });

        it('pone currentPlayer a null al eliminar al jugador activo', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            expect(result.current.currentPlayer?.name).toBe('Alice');

            act(() => { result.current.removePlayer('Alice'); });

            expect(result.current.currentPlayer).toBeNull();
        });

        it('no modifica currentPlayer al eliminar un jugador diferente al activo', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            act(() => { result.current.addPlayer('Bob'); });

            // currentPlayer sigue siendo Alice (el primero añadido)
            expect(result.current.currentPlayer?.name).toBe('Alice');

            act(() => { result.current.removePlayer('Bob'); });

            expect(result.current.currentPlayer?.name).toBe('Alice');
            expect(result.current.jugadores).toHaveLength(1);
        });

        it('no hace nada si el nombre no existe en la lista', () => {
            const { result } = renderHook(() => usePlayerManagement());

            act(() => { result.current.addPlayer('Alice'); });
            act(() => { result.current.removePlayer('Inexistente'); });

            expect(result.current.jugadores).toHaveLength(1);
        });
    });
});
