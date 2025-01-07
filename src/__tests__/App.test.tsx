import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
    it('renders the main title after SplashScreen', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByText(/🎲/)).not.toBeInTheDocument();
        });

        // Verificar que el título principal esté disponible
        const title = screen.getByText(/Cubo de Poker 🎲/i);
        expect(title).toBeInTheDocument();
    });

    it('adds a new player after SplashScreen', async () => {
        render(<App />);

        // Esperar a que el SplashScreen desaparezca
        await waitFor(() => {
            expect(screen.queryByText(/🎲/i)).not.toBeInTheDocument();
        });

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
            expect(screen.queryByText(/🎲/i)).not.toBeInTheDocument();
        });

        // Verificar que el botón de eliminar jugador está deshabilitado
        const deleteButton = screen.getByText(/Eliminar jugador/i);
        expect(deleteButton).toBeDisabled();
    });
});