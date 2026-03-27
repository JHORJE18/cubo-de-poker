import { describe, it, expect } from 'vitest';
import { Tirada, Jugador } from '../types';

describe('Tirada', () => {
    describe('constructor', () => {
        it('inicializa todos los campos a 0 por defecto', () => {
            const tirada = new Tirada();
            expect(tirada.as).toBe(0);
            expect(tirada.k).toBe(0);
            expect(tirada.q).toBe(0);
            expect(tirada.j).toBe(0);
            expect(tirada.rojas).toBe(0);
            expect(tirada.negras).toBe(0);
        });

        it('inicializa solo los campos proporcionados', () => {
            const tirada = new Tirada({ as: 3, k: 2 });
            expect(tirada.as).toBe(3);
            expect(tirada.k).toBe(2);
            expect(tirada.q).toBe(0);
            expect(tirada.j).toBe(0);
            expect(tirada.rojas).toBe(0);
            expect(tirada.negras).toBe(0);
        });

        it('inicializa todos los campos cuando se pasan todos', () => {
            const tirada = new Tirada({ as: 1, k: 2, q: 3, j: 4, rojas: 5, negras: 6 });
            expect(tirada.as).toBe(1);
            expect(tirada.k).toBe(2);
            expect(tirada.q).toBe(3);
            expect(tirada.j).toBe(4);
            expect(tirada.rojas).toBe(5);
            expect(tirada.negras).toBe(6);
        });
    });

    describe('getTotal', () => {
        it('devuelve 0 cuando todos los campos son 0', () => {
            expect(new Tirada().getTotal()).toBe(0);
        });

        it('aplica el multiplicador x6 al As', () => {
            expect(new Tirada({ as: 1 }).getTotal()).toBe(6);
            expect(new Tirada({ as: 5 }).getTotal()).toBe(30);
        });

        it('aplica el multiplicador x5 a la K', () => {
            expect(new Tirada({ k: 1 }).getTotal()).toBe(5);
            expect(new Tirada({ k: 4 }).getTotal()).toBe(20);
        });

        it('aplica el multiplicador x4 a la Q', () => {
            expect(new Tirada({ q: 1 }).getTotal()).toBe(4);
            expect(new Tirada({ q: 3 }).getTotal()).toBe(12);
        });

        it('aplica el multiplicador x3 a la J', () => {
            expect(new Tirada({ j: 1 }).getTotal()).toBe(3);
            expect(new Tirada({ j: 4 }).getTotal()).toBe(12);
        });

        it('aplica el multiplicador x2 a las Rojas', () => {
            expect(new Tirada({ rojas: 1 }).getTotal()).toBe(2);
            expect(new Tirada({ rojas: 6 }).getTotal()).toBe(12);
        });

        it('aplica el multiplicador x1 a las Negras', () => {
            expect(new Tirada({ negras: 1 }).getTotal()).toBe(1);
            expect(new Tirada({ negras: 7 }).getTotal()).toBe(7);
        });

        it('suma correctamente todos los campos a la vez', () => {
            // 1*6 + 1*5 + 1*4 + 1*3 + 1*2 + 1*1 = 21
            const tirada = new Tirada({ as: 1, k: 1, q: 1, j: 1, rojas: 1, negras: 1 });
            expect(tirada.getTotal()).toBe(21);
        });

        it('calcula correctamente con valores altos', () => {
            // 5*6 + 5*5 + 3*4 + 3*3 = 30+25+12+9 = 76
            const tirada = new Tirada({ as: 5, k: 5, q: 3, j: 3 });
            expect(tirada.getTotal()).toBe(76);
        });
    });
});

describe('Jugador', () => {
    describe('constructor', () => {
        it('asigna el nombre correctamente', () => {
            const jugador = new Jugador('Alice');
            expect(jugador.name).toBe('Alice');
        });

        it('crea dos tiradas vacías por defecto', () => {
            const jugador = new Jugador('Alice');
            expect(jugador.tiradas).toHaveLength(2);
            expect(jugador.tiradas[0].getTotal()).toBe(0);
            expect(jugador.tiradas[1].getTotal()).toBe(0);
        });

        it('usa las tiradas proporcionadas cuando se pasan', () => {
            const tiradas = [new Tirada({ as: 2 }), new Tirada({ k: 3 })];
            const jugador = new Jugador('Bob', tiradas);
            expect(jugador.tiradas).toHaveLength(2);
            expect(jugador.tiradas[0].as).toBe(2);
            expect(jugador.tiradas[1].k).toBe(3);
        });
    });

    describe('getTotal', () => {
        it('devuelve 0 cuando todas las tiradas son cero', () => {
            const jugador = new Jugador('Alice');
            expect(jugador.getTotal()).toBe(0);
        });

        it('suma correctamente las dos rondas', () => {
            // Ronda 1: as=5 → 30; Ronda 2: k=4 → 20; Total = 50
            const jugador = new Jugador('Alice', [
                new Tirada({ as: 5 }),
                new Tirada({ k: 4 }),
            ]);
            expect(jugador.getTotal()).toBe(50);
        });

        it('funciona con una sola tirada en el array', () => {
            const jugador = new Jugador('Alice', [new Tirada({ j: 3 })]);
            expect(jugador.getTotal()).toBe(9);
        });

        it('funciona con un array vacío de tiradas', () => {
            const jugador = new Jugador('Alice', []);
            expect(jugador.getTotal()).toBe(0);
        });
    });
});
