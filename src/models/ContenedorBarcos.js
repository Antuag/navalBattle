export class ContenedorBarcos {
    constructor() {
        this.barcos = [];
    }

    agregarBarco(barco) {
        this.barcos.push(barco);
    }

   

    obtenerBarcos() {
        return this.barcos;
    }
};
