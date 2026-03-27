import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TiradasSection from '../components/TiradasSection';
import { Jugador, Tirada } from '../types';

const mockUpdateScore = vi.fn();

describe('TiradasSection', () => {
    beforeEach(() => {
        mockUpdateScore.mockClear();
    });

    it('muestra mensaje cuando no hay jugador seleccionado', () => {
        render(<TiradasSection currentPlayer={null} updateScore={mockUpdateScore} />);
        expect(screen.getByText(/selecciona un jugador/i)).toBeInTheDocument();
    });

    it('no renderiza el formulario cuando currentPlayer es null', () => {
        render(<TiradasSection currentPlayer={null} updateScore={mockUpdateScore} />);
        expect(screen.queryByText(/Registro de Tiradas/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/As:/i)).not.toBeInTheDocument();
    });

    it('renderiza el título y las dos rondas cuando hay jugador seleccionado', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        expect(screen.getByText(/Registro de Tiradas/i)).toBeInTheDocument();
        expect(screen.getByText(/Ronda 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Ronda 2/i)).toBeInTheDocument();
    });

    it('renderiza 12 inputs en total (6 por ronda)', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs).toHaveLength(12);
    });

    it('muestra las etiquetas correctas para cada campo', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        // Cada etiqueta aparece dos veces (una por ronda)
        expect(screen.getAllByLabelText(/^As:$/)).toHaveLength(2);
        expect(screen.getAllByLabelText(/^K:$/)).toHaveLength(2);
        expect(screen.getAllByLabelText(/^Q:$/)).toHaveLength(2);
        expect(screen.getAllByLabelText(/^J:$/)).toHaveLength(2);
        expect(screen.getAllByLabelText(/^Rojas:$/)).toHaveLength(2);
        expect(screen.getAllByLabelText(/^Negras:$/)).toHaveLength(2);
    });

    it('muestra los valores actuales del jugador en los inputs', () => {
        const jugador = new Jugador('Alice', [
            new Tirada({ as: 3, k: 2 }),
            new Tirada({ rojas: 5, negras: 1 }),
        ]);
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const asInputs = screen.getAllByLabelText(/^As:$/);
        expect(asInputs[0]).toHaveValue(3);
        expect(asInputs[1]).toHaveValue(0);

        const kInputs = screen.getAllByLabelText(/^K:$/);
        expect(kInputs[0]).toHaveValue(2);

        const rojasInputs = screen.getAllByLabelText(/^Rojas:$/);
        expect(rojasInputs[1]).toHaveValue(5);

        const negrasInputs = screen.getAllByLabelText(/^Negras:$/);
        expect(negrasInputs[1]).toHaveValue(1);
    });

    it('llama a updateScore con los parámetros correctos al cambiar un input de ronda 1', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const asInputRonda1 = screen.getAllByLabelText(/^As:$/)[0];
        fireEvent.change(asInputRonda1, { target: { value: '4' } });

        expect(mockUpdateScore).toHaveBeenCalledWith('Alice', 0, 'as', 4);
    });

    it('llama a updateScore con los parámetros correctos al cambiar un input de ronda 2', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const kInputRonda2 = screen.getAllByLabelText(/^K:$/)[1];
        fireEvent.change(kInputRonda2, { target: { value: '2' } });

        expect(mockUpdateScore).toHaveBeenCalledWith('Alice', 1, 'k', 2);
    });

    it('usa 0 como valor cuando el input queda vacío o no es un número', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const qInput = screen.getAllByLabelText(/^Q:$/)[0];
        fireEvent.change(qInput, { target: { value: '' } });

        expect(mockUpdateScore).toHaveBeenCalledWith('Alice', 0, 'q', 0);
    });

    it('llama a updateScore correctamente para el campo Negras en ronda 2', () => {
        const jugador = new Jugador('Alice');
        render(<TiradasSection currentPlayer={jugador} updateScore={mockUpdateScore} />);

        const negrasRonda2 = screen.getAllByLabelText(/^Negras:$/)[1];
        fireEvent.change(negrasRonda2, { target: { value: '7' } });

        expect(mockUpdateScore).toHaveBeenCalledWith('Alice', 1, 'negras', 7);
    });
});
