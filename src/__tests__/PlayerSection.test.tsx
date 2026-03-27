import { render, screen, fireEvent } from "@testing-library/react";
import PlayerSection from "../components/PlayerSection";
import { vi } from "vitest";

const mockSetCurrentPlayer = vi.fn();
const mockAddPlayer = vi.fn();
const mockRemovePlayer = vi.fn();

describe("PlayerSection", () => {

    beforeEach(() => {
        mockSetCurrentPlayer.mockClear();
        mockAddPlayer.mockClear();
        mockRemovePlayer.mockClear();
    });

    test("Renderiza correctamente el titulo y controles iniciales", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        expect(screen.getByText(/Gesti\u00f3n de Jugadores/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Nuevo jugador/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /a\u00f1adir jugador/i })).toBeDisabled();
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
        const addButton = screen.getByRole("button", { name: /a\u00f1adir jugador/i });

        fireEvent.change(input, { target: { value: "Jugador 1" } });
        expect(addButton).not.toBeDisabled();

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

    test("Deshabilitar el boton Anadir jugador si el input esta vacio", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const addButton = screen.getByRole("button", { name: /a\u00f1adir jugador/i });
        expect(addButton).toBeDisabled();
    });

    test("Deshabilitar el boton Anadir jugador si el input contiene solo espacios", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        const addButton = screen.getByRole("button", { name: /a\u00f1adir jugador/i });

        fireEvent.change(input, { target: { value: "   " } });
        expect(addButton).toBeDisabled();
    });

    test("El input se limpia despues de anadir un jugador", () => {
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
        const addButton = screen.getByRole("button", { name: /a\u00f1adir jugador/i });

        fireEvent.change(input, { target: { value: "Jugador 1" } });
        fireEvent.click(addButton);

        expect(input.value).toBe("");
    });

    test("Presionar Enter llama a addPlayer con el nombre del input", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        fireEvent.change(input, { target: { value: "Jugador Enter" } });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(mockAddPlayer).toHaveBeenCalledWith("Jugador Enter");
    });

    test("Presionar Enter no llama a addPlayer si el input esta vacio", () => {
        render(
            <PlayerSection
                jugadores={[]}
                currentPlayer={null}
                setCurrentPlayer={mockSetCurrentPlayer}
                addPlayer={mockAddPlayer}
                removePlayer={mockRemovePlayer}
            />
        );

        const input = screen.getByPlaceholderText(/Nuevo jugador/i);
        fireEvent.keyDown(input, { key: "Enter" });

        expect(mockAddPlayer).not.toHaveBeenCalled();
    });

});
