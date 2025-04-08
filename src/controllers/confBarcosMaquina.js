import { Barco } from "../models/Barco.js"; // Importa la clase Barco
import { matrizTablero } from "../controllers/creacionTablero.js"; // Función para crear una matriz de tablero vacía
import { ContenedorBarcos } from "../models/ContenedorBarcos.js"; // Contenedor global de barcos
import Utils from "./Utils.js"; // Herramientas utilitarias como números aleatorios

// Función principal para crear barcos de la máquina
export function crearBarcosMaquina() {
    const tamañosBarcos = [2, 2, 3, 3, 4, 5]; // Lista de tamaños de barcos a colocar
    const matrizMaquina = matrizTablero(); // Crea una nueva matriz del tablero para la máquina
    
    // Recorre cada tamaño de barco para colocarlo en el tablero
    tamañosBarcos.forEach(tamaño => {
      let barcoColocado = false; // Bandera para controlar si ya se colocó el barco

      // Intenta colocar el barco hasta que lo logre (posición válida)
      do {
        let barco = crearBarco(tamaño, matrizMaquina); // Intenta crear un barco con el tamaño y matriz

        if (barco !== false) {
          ContenedorBarcos.barcosMaquina.push(barco); // Guarda el barco en el contenedor de barcos

          // Marca en la matriz las posiciones ocupadas por el barco
          barco.getPoscicionesBarco().forEach(posicion => {
            const x = posicion[0];
            const y = posicion[1];
            matrizMaquina[x][y] = `p2-${x}-${y}`; // Marca la celda como ocupada por un barco de la máquina
            barcoColocado = true; // Marca que el barco fue colocado exitosamente
          });
        }
      } while (!barcoColocado); // Sigue intentando hasta que se coloque correctamente
    });

    console.log(matrizMaquina); // Muestra la matriz con los barcos colocados
    return matrizMaquina; // Devuelve la matriz con los barcos
} 
  
// Función auxiliar que intenta crear un barco si hay espacio válido
function crearBarco(tamaño, matriz) {
    const poscicionesBarco = generarPosciciones(tamaño, matriz); // Genera posibles posiciones

    if (poscicionesBarco != false) {
      let barco = new Barco(); // Crea una nueva instancia de Barco
      barco.poscicionesBarco = poscicionesBarco; // Asigna las posiciones al barco
      return barco; // Retorna el barco creado
    }

    return false; // Si no fue posible colocarlo, retorna falso
}
  
// Función que genera posiciones válidas aleatorias para un barco según su tamaño y la matriz actual
function generarPosciciones(tamaño, matriz){
    const tablero = JSON.parse(localStorage.getItem("tablero")); // Obtiene datos del tablero desde localStorage
    const tamañoTablero = tablero["tamañoTablero"]; // Obtiene el tamaño del tablero (número de filas/columnas)
    
    let orientacion = Utils.numeroAleatorioEntre(0, 1); // 0 = horizontal, 1 = vertical
    const posiciones = []; // Arreglo para guardar las posiciones generadas

    if (orientacion == 0) {
      // Generar posición horizontal
      let x = Utils.numeroAleatorioEntre(0, tamañoTablero - 1); // Fila fija
      let y = Utils.numeroAleatorioEntre(0, tamañoTablero - tamaño); // Columna inicial aleatoria

      // Recorre las columnas donde se ubicaría el barco
      for (let j = y; j < tamaño + y; j++) {
        if (matriz[x][j] != "a") {
          return false; // Si alguna posición ya está ocupada, se cancela
        }
        posiciones.push([x, j]); // Agrega la posición como válida
      }
      
    } else {
      // Generar posición vertical
      let x = Utils.numeroAleatorioEntre(0, tamañoTablero - tamaño); // Fila inicial aleatoria
      let y = Utils.numeroAleatorioEntre(0, tamañoTablero - 1); // Columna fija

      // Recorre las filas donde se ubicaría el barco
      for (let j = x; j < tamaño + x; j++) {
        if (matriz[j][y] != "a") {
          return false; // Si alguna posición ya está ocupada, se cancela
        }
        posiciones.push([j, y]); // Agrega la posición como válida
      }
    }

    return posiciones; // Devuelve las posiciones válidas encontradas
}
