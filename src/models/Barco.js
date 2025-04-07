export class Barco{
    constructor(){    
        this.poscicionesBarco = [];
    }
    
    setPoscicionBarco(poscicionBarco){
        this.poscicionesBarco.push(poscicionBarco);
    }
    getPoscicionesBarco(){
        return this.poscicionesBarco;
    }   

    
}