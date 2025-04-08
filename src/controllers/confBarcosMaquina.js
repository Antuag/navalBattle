import { Barco } from "../models/Barco.js";
import { matrizTablero } from "../controllers/creacionTablero.js";
import { ContenedorBarcos } from "../models/ContenedorBarcos.js";
import Utils from "./Utils.js";


export function crearBarcosMaquina() {
    const  tamañosBarcos = [2];
    const matrizMaquina= matrizTablero()
    
    tamañosBarcos.forEach(tamaño=> {
      let barcoColocado=false
      do {
        let barco =crearBarco(tamaño,matrizMaquina)
        if (barco!==false) {
          ContenedorBarcos.barcosMaquina.push(barco)
          barco.getPoscicionesBarco().forEach(posicion => {
            const x = posicion[0];
            const y = posicion[1];
            matrizMaquina[x][y]=`p2-${x}-${y}`
           
            barcoColocado=true
          })
        }
      } while (!barcoColocado);
      
    })
    console.log(matrizMaquina);
    return matrizMaquina
  } 
  
  function crearBarco(tamaño,matriz) {
  
    const poscicionesBarco=generarPosciciones(tamaño,matriz)
    if (poscicionesBarco!= false) {
      let barco = new Barco();
      barco.poscicionesBarco=poscicionesBarco
      return barco
    }
    return false
  }
  
  
  //falta volverlo optimo ya que se puede ahorrar muchas linas de codigo
  function generarPosciciones(tamaño,matriz){
    const tablero = JSON.parse(localStorage.getItem("tablero"));  
    const tamañoTablero = tablero["tamañoTablero"];
    let orientacion = Utils.numeroAleatorioEntre(0, 1) // 0 horizontal, 1 vertical;
    const posiciones=[]
    if (orientacion == 0) {
      let x = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
      let y = Utils.numeroAleatorioEntre(0, tamañoTablero - tamaño);
      for (let j = y; j < tamaño + y; j++) {
        if (matriz[x][j] != "a") {
          return false;
        }
       
        posiciones.push([x, j]);
      }
      
    }else {
      let x = Utils.numeroAleatorioEntre(0, tamañoTablero - tamaño);
      let y = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
      for (let j = x; j < tamaño + x; j++) {
        if (matriz[j][y] != "a") {
          return false;
        }
        posiciones.push([j, y]);
      }
    }
    return posiciones;
  
  }
 
  