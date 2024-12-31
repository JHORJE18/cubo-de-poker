export class Tirada {
    as: number;
    k: number;
    q: number;
    j: number;
    rojas: number;
    negras: number;

    constructor(as = 0, k = 0, q = 0, j = 0, rojas = 0, negras = 0) {
        this.as = as;
        this.k = k;
        this.q = q;
        this.j = j;
        this.rojas = rojas;
        this.negras = negras;
    }

    // Calcula el puntaje total con los multiplicadores
    getTotal(): number {
        return (
            this.as * 6 +
            this.k * 5 +
            this.q * 4 +
            this.j * 3 +
            this.rojas * 2 +
            this.negras * 1
        );
    }
}

export class Jugador {
    name: string;
    round1: Tirada;
    round2: Tirada;

    constructor(name: string) {
        this.name = name;
        this.round1 = new Tirada();
        this.round2 = new Tirada();
    }

    // Calcula el total de todas las rondas
    getTotal(): number {
        return this.round1.getTotal() + this.round2.getTotal();
    }
}