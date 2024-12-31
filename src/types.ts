export class Tirada {
    as: number;
    k: number;
    q: number;
    j: number;
    rojas: number;
    negras: number;

    constructor(data?: Partial<Tirada>) {
        this.as = data?.as || 0;
        this.k = data?.k || 0;
        this.q = data?.q || 0;
        this.j = data?.j || 0;
        this.rojas = data?.rojas || 0;
        this.negras = data?.negras || 0;
    }

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
    tiradas: Tirada[]; // Un array para almacenar múltiples tiradas

    constructor(name: string, tiradas?: Tirada[]) {
        this.name = name;
        this.tiradas = tiradas || [new Tirada(), new Tirada()]; // Inicializa con una tirada vacía
    }

    // Calcula el total sumando todas las tiradas
    getTotal(): number {
        return this.tiradas.reduce((acc, tirada) => acc + tirada.getTotal(), 0);
    }
}