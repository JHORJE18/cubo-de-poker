import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {

    it("muestra y oculta el SplashScreen correctamente", async () => {
        render(<App />);

        // Verifica que el SplashScreen se muestra inicialmente
        expect(screen.getByText(/🎲/i)).toBeInTheDocument();

        // Espera a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 1500 });

        // Verifica que el contenido principal se muestra
        expect(screen.getByText(/Cubo de Poker/i)).toBeInTheDocument();
    });

    it('adds a new player after SplashScreen', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 1500 });

        // Interactuar con el formulario
        const input = screen.getByPlaceholderText(/Introduce un jugador/i);
        const button = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador 1');
        await userEvent.click(button);

        // Verificar que el jugador fue añadido
        const newPlayer = screen.getByText(/Jugador 1/i);
        expect(newPlayer).toBeInTheDocument();
    });

    it('disables the delete button when no players exist', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 1500 });

        // Verificar que el botón de eliminar jugador está deshabilitado
        const deleteButton = screen.getByText(/Eliminar jugador/i);
        expect(deleteButton).toBeDisabled();
    });

    it('removes a player correctly', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 1500 });

        // Añadir un jugador
        const input = screen.getByPlaceholderText(/Introduce un jugador/i);
        const addButton = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador 1');
        await userEvent.click(addButton);

        // Verificar que el jugador fue añadido
        const newPlayer = screen.getByText(/Jugador 1/i);
        expect(newPlayer).toBeInTheDocument();

        // Eliminar el jugador
        const deleteButton = screen.getByText(/Eliminar jugador/i);
        await userEvent.click(deleteButton);

        // Verificar que el jugador fue eliminado
        expect(screen.queryByText(/Jugador 1/i)).not.toBeInTheDocument();
    });

    it('updates player score correctly', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByTestId("splash-emoji")).not.toBeInTheDocument();
        }, { timeout: 1500 });

        // Añadir un jugador
        const input = screen.getByPlaceholderText(/Introduce un jugador/i);
        const addButton = screen.getByText(/Añadir jugador/i);

        await userEvent.type(input, 'Jugador 1');
        await userEvent.click(addButton);

        // Verificar que el jugador fue añadido
        const newPlayer = screen.getByText(/Jugador 1/i);
        expect(newPlayer).toBeInTheDocument();

        // Actualizar la puntuación del jugador
        const scoreInput = screen.getByLabelText(/As/i);
        await userEvent.type(scoreInput, '5');

        // Verificar que la puntuación fue actualizada
        expect(scoreInput).toHaveValue(5);
    });
});