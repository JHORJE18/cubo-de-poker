import { render, screen, fireEvent } from "@testing-library/react";
import PlayerSection from "../components/PlayerSection";
import { vi } from "vitest";

const mockSetCurrentPlayer = vi.fn();
const mockAddPlayer = vi.fn();
const mockRemovePlayer = vi.fn();

describe("PlayerSection", () => {

    test("Renderiza correctamente el título y controles iniciales", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        expect(screen.getByText(/Gestión de Jugadores/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Nuevo jugador/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /añadir jugador/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /eliminar jugador/i })).toBeDisabled();
    });

    test("Permite agregar un nuevo jugador", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const input = screen.getByPlaceholderText(/Nuevo jugador/i) as HTMLInputElement;
        const addButton = screen.getByRole("button", { name: /añadir jugador/i });

        // Simula escribir en el input
        fireEvent.change(input, { target: { value: "Jugador 1" } });
        // Verifica que el botón se habilite
        expect(addButton).not.toBeDisabled();

        // Simula clic en el botón de añadir jugador
        addButton.click();
        expect(mockAddPlayer).toHaveBeenCalledWith("Jugador 1");
    });

    test("Seleccionar un jugador del dropdown", () => {
        const mockPlayers = [
            { name: "Jugador 1", tiradas: [], getTotal: () => 0 },
            { name: "Jugador 2", tiradas: [], getTotal: () => 0 },
        ];

        render(
            <PlayerSection
                jugadores={mockPlayers}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const select = screen.getByRole("combobox") as HTMLSelectElement;
        select.value = "Jugador 2";
        screen.getByRole("combobox").dispatchEvent(new Event("change", { bubbles: true }));

        expect(mockSetCurrentPlayer).toHaveBeenCalledWith(mockPlayers[1]);
    });

    test("Eliminar jugador seleccionado", () => {
        const mockPlayers = [{ name: "Jugador 1", tiradas: [], getTotal: () => 0 }];

        render(
            <PlayerSection
                jugadores={mockPlayers}
                currentPlayer={mockPlayers[0]}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const deleteButton = screen.getByRole("button", { name: /eliminar jugador/i });
        deleteButton.click();

        expect(mockRemovePlayer).toHaveBeenCalledWith("Jugador 1");
    });

    test("Deshabilitar el botón “Añadir jugador” si el input está vacío", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const addButton = screen.getByRole("button", { name: /añadir jugador/i });
        expect(addButton).toBeDisabled();
    });

});