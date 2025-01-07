import { render, screen, within } from '@testing-library/react';
import RankingSection from '../components/RankingSection';
import { Jugador, Tirada } from '../types';

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
});