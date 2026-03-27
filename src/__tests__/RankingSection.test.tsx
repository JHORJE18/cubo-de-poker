import { render, screen, within, fireEvent } from '@testing-library/react';
import RankingSection from '../components/RankingSection';
import { Jugador, Tirada } from '../types';
import { vi } from "vitest";

describe('RankingSection Component', () => {
    const mockPlayers = [
        new Jugador('Jugador 1', [new Tirada({ as: 5, k: 5 }), new Tirada({ q: 3, j: 3 })]),
        new Jugador('Jugador 2', [new Tirada({ q: 4, rojas: 1 }), new Tirada({ negras: 2 })]),
        new Jugador('Jugador Medio', [new Tirada({ as: 1, k: 1 }), new Tirada({ as: 1, k: 1 })]),
    ];

    it('Representa correctamente a los jugadores y sus puntuaciones.', () => {
        render(<RankingSection jugadores={mockPlayers} currentPlayer={null} setCurrentPlayer={vi.fn()} />);

        // Obtener todas las filas del cuerpo de la tabla
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(4); // 1 header + 2 players

        // Verificar la primera fila (Jugador 1)
        const firstRowCells = within(rows[1]).getAllByRole('cell');
        expect(firstRowCells[0]).toHaveTextContent('1'); // Posición
        expect(firstRowCells[1]).toHaveTextContent('Jugador 1'); // Nombre
        expect(firstRowCells[2]).toHaveTextContent('55'); // Ronda 1
        expect(firstRowCells[3]).toHaveTextContent('21'); // Ronda 2
        expect(firstRowCells[4]).toHaveTextContent('76'); // Total

        // Verificar la segunda fila (Jugador 3)
        const secondRowCells = within(rows[2]).getAllByRole('cell');
        expect(secondRowCells[0]).toHaveTextContent('2'); // Posición
        expect(secondRowCells[1]).toHaveTextContent('Jugador Medio'); // Nombre
        expect(secondRowCells[2]).toHaveTextContent('11'); // Ronda 1
        expect(secondRowCells[3]).toHaveTextContent('11'); // Ronda 2
        expect(secondRowCells[4]).toHaveTextContent('22'); // Total

        // Verificar la segunda fila (Jugador 2)
        const thirdRowCells = within(rows[3]).getAllByRole('cell');
        expect(thirdRowCells[0]).toHaveTextContent('3'); // Posición
        expect(thirdRowCells[1]).toHaveTextContent('Jugador 2'); // Nombre
        expect(thirdRowCells[2]).toHaveTextContent('18'); // Ronda 1
        expect(thirdRowCells[3]).toHaveTextContent('2'); // Ronda 2
        expect(thirdRowCells[4]).toHaveTextContent('20'); // Total
    });

    it('renderiza una tabla vacía cuando no hay jugadores', () => {
        render(<RankingSection jugadores={[]} currentPlayer={null} setCurrentPlayer={vi.fn()} />);

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1); // solo la cabecera
    });

    it('llama a setCurrentPlayer con el jugador correcto al hacer clic en una fila', () => {
        const mockSetCurrentPlayer = vi.fn();
        render(
            <RankingSection
                jugadores={mockPlayers}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
            />
        );

        const rows = screen.getAllByRole('row');
        fireEvent.click(rows[1]); // primera fila de datos (Jugador 1 con mayor puntuación)

        expect(mockSetCurrentPlayer).toHaveBeenCalledOnce();
        expect(mockSetCurrentPlayer.mock.calls[0][0].name).toBe('Jugador 1');
    });

    it('aplica la clase selected-row a la fila del jugador activo', () => {
        render(
            <RankingSection
                jugadores={mockPlayers}
                currentPlayer={mockPlayers[0]}
                setCurrentPlayer={vi.fn()}
            />
        );

        const rows = screen.getAllByRole('row');
        // Jugador 1 es el primero en el ranking, por lo que está en rows[1]
        expect(rows[1]).toHaveClass('selected-row');
        expect(rows[2]).not.toHaveClass('selected-row');
    });

    it('no aplica selected-row a ninguna fila cuando currentPlayer es null', () => {
        render(
            <RankingSection
                jugadores={mockPlayers}
                currentPlayer={null}
                setCurrentPlayer={vi.fn()}
            />
        );

        const rows = screen.getAllByRole('row');
        rows.slice(1).forEach(row => {
            expect(row).not.toHaveClass('selected-row');
        });
    });
});