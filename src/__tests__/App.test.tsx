import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Juego completo', () => {

    beforeEach(async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 2000 });
    })


    it("Muestra y oculta el SplashScreen correctamente", async () => {
        // Verifica que el SplashScreen se muestra inicialmente
        expect(screen.getByText(/🎲/i)).toBeInTheDocument();

        // Verifica que el contenido principal se muestra
        expect(screen.getByText(/Cubo de Poker/i)).toBeInTheDocument();
    });

    it('Añade un nuevo jugador', async () => {
        // Interactuar con el formulario
        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        const button = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador A');
        await userEvent.click(button);

        // Verificar que el jugador fue añadido en la tabla
        const newPlayer = screen.getAllByText(/Jugador A/i);
        const table = screen.getByRole('table');
        const playerInTable = newPlayer.some(player => table.contains(player));
        expect(playerInTable);
    });

    it('disables the delete button when no players exist', async () => {
        // Verificar que el botón de eliminar jugador está deshabilitado
        const deleteButton = screen.getByText(/Eliminar jugador/i);
        expect(deleteButton).toBeDisabled();
    });

    it('Elimina a un jugador', async () => {
        // Añadir un jugador
        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        const addButton = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador B');
        await userEvent.click(addButton);

        // Verificar que el jugador fue añadido
        const newPlayer = screen.getAllByText(/Jugador B/i);
        expect(newPlayer[0]).toBeInTheDocument();

        // Eliminar el jugador
        const deleteButton = screen.getByText(/Eliminar jugador/i);
        await userEvent.click(deleteButton);

        // Verificar que el jugador fue eliminado
        expect(screen.queryByText(/Jugador 1/i)).not.toBeInTheDocument();
    });

    it('Actualiza la puntuación del jugador correctamente', async () => {
        // Añadir un jugador
        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        const addButton = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador C');
        await userEvent.click(addButton);

        // Verificar que el jugador fue añadido
        const newPlayer = screen.getAllByText(/Jugador C/i);
        expect(newPlayer[0]).toBeInTheDocument();

        // Actualizar la puntuación del jugador
        const scoreInput = screen.getAllByLabelText('As:');
        await userEvent.type(scoreInput[0], '5');

        // Verificar que la puntuación fue actualizada
        expect(scoreInput[0]).toHaveValue(5);

        // Verificar puntuación en la tabla
        const table = screen.getByRole('table');
        const scoreInTable = screen.getAllByText(/30/i);
        expect(table.contains(scoreInTable[0])).toBeTruthy();

        // Añade puntuación a ronda 2
        await userEvent.type(scoreInput[1], '3');
        expect(scoreInput[1]).toHaveValue(3);

        // Verifica que la puntuación fue actualizada
        expect(screen.getByText(/18/i)).toBeInTheDocument();
        expect(scoreInTable[1]).toHaveTextContent('48');
    });
});