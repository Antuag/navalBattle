// Importaciones necesarias desde otros módulos del proyecto
import { crearJuego } from "./juego.js";
import { cargarClima } from "./clima.js";
import Utils from "./Utils.js";
import { crearMapa } from "./creacionTablero.js";
import { Barco } from "../models/Barco.js";
import { ContenedorBarcos } from "../models/ContenedorBarcos.js";
import { matrizTablero } from "./creacionTablero.js";

// Función que configura la colocación de los barcos por parte del jugador
export function configuracionPosBarcos() {
  let contenedor = document.getElementById("tableroGuerra3"); // Contenedor del tablero
  localStorage.setItem("girarBarco", false); // Por defecto los barcos no se giran (horizontal)
  
  // Se crea el mapa del jugador 1 con eventos de clic para colocar los barcos
  crearMapa(contenedor, "p1-", async (idCasilla) => {
    const tablero = JSON.parse(localStorage.getItem("tablero")); // Obtener datos del tablero desde localStorage
    const tamañoTablero = tablero["tamañoTablero"]; // Tamaño del tablero
    const selectBarco = document.getElementById("selectBarco"); // Selector del tipo de barco
    let tamañoBarco = parseInt(
      selectBarco.options[selectBarco.selectedIndex].getAttribute("data-size")
    ); // Obtener el tamaño del barco seleccionado

    const coordenadas = idCasilla.split("-"); // Obtener coordenadas X, Y desde el ID de la casilla
    let x = parseInt(coordenadas[1]);
    let y = parseInt(coordenadas[2]);
    const girarBarco = localStorage.getItem("girarBarco"); // Saber si el barco va en vertical u horizontal

    // Validación: si el barco está girado (vertical)
    if (girarBarco == "true") {
      const finalX = x + tamañoBarco;
      if (finalX >= tamañoTablero) {
        alert("No se puede colocar el barco en esa posicion, ya que se sale del tablero");
        return;
      }
      for (let i = x; i < finalX; i++) {
        if (document.getElementById(`p1-${i}-${y}`).style.backgroundColor != "") {
          alert("No se puede colocar el barco en esa posicion, ya que se solapa con otro barco");
          return;
        }
      }
    } else {
      // Validación: si el barco está horizontal
      const finalY = y + tamañoBarco;
      if (finalY >= tamañoTablero) {
        alert("No se puede colocar el barco en esa posicion, ya que se sale del tablero");
        return;
      }
      for (let i = y; i < finalY; i++) {
        if (document.getElementById(`p1-${x}-${i}`).style.backgroundColor != "") {
          alert("No se puede colocar el barco en esa posicion, ya que se solapa con otro barco");
          return;
        }
      }
    }

    // Validación: si no hay un barco seleccionado
    if (!tamañoBarco) {
      alert("Por favor, selecciona un barco primero.");
      return;
    }

    // Obtener el color seleccionado por el usuario para pintar el barco
    var colorBarco = document.getElementById("colorBarcos").value;

    // Guardar coordenadas en localStorage (no se está usando correctamente este JSON.stringify)
    localStorage.setItem("coordenadas", JSON.stringify(x, y));

    // Crear instancia de un nuevo barco
    let barco = new Barco();

    // Pintar el barco en el tablero y guardar su posición
    if (girarBarco == "true") {
      pintarBarcoEje(x, (j) => {
        let boton = document.getElementById(`p1-${j}-${y}`);
        boton.style.backgroundColor = colorBarco;
        barco.setPoscicionBarco([j, y]);
      });
    } else {
      pintarBarcoEje(y, (j) => {
        let boton = document.getElementById(`p1-${x}-${j}`);
        boton.style.backgroundColor = colorBarco;
        barco.setPoscicionBarco([x, j]);
      });
    }

    // Agregar el barco al contenedor de barcos del jugador
    ContenedorBarcos.barcosJugador.push(barco);

    // Actualizar la cantidad de barcos disponibles
    let option = selectBarco.options[selectBarco.selectedIndex];
    let cantidadBarco = parseInt(option.getAttribute("cantidad"));
    option.setAttribute("cantidad", cantidadBarco - 1);

    // Si ya no hay barcos de ese tipo, quitarlo del select
    if (cantidadBarco - 1 == 0) {
      selectBarco.remove(selectBarco.selectedIndex);
    }

    // Reiniciar la selección del barco y su imagen
    selectBarco.selectedIndex = 0;
    document.getElementById("imgBarco").src = "src/assets/img/cheems.png";
    console.log(selectBarco.length);

    // Si solo queda una opción en el select, se da por terminada la configuración
    if (selectBarco.length == 1) {
      localStorage.setItem(
        "tableroJugador",
        document.getElementById("tableroGuerra3").innerHTML
      );

      // Cargar pantalla de clima y luego la de juego
      await Utils.loadPage(
        "src/views/climaUsuario.html",
        document.getElementById("container"),
        true
      );
      await Utils.loadPage(
        "src/views/juego.html",
        document.getElementById("container"),
        false
      );

      // Activar clase de estilo de batalla, cargar clima y crear el juego
      document.body.classList.add('batalla');
      cargarClima();
      crearJuego();
    }
  });
}

// Función auxiliar que recorre una cantidad de posiciones desde un punto y aplica una acción (evento)
function pintarBarcoEje(j, evento) {
  let tamañoBarco = parseInt(
    selectBarco.options[selectBarco.selectedIndex].getAttribute("data-size")
  );

  for (let i = j; i < tamañoBarco + j; i++) {
    evento(i);
  }
}

// Configura el comportamiento al seleccionar un tipo de barco
export function seleccionBarcos() {
  const selectBarco = document.getElementById("selectBarco");
  const imgBarco = document.getElementById("imgBarco");

  selectBarco.addEventListener("change", function () {
    let barcoSeleccionado = this.value;
    let tamañoBarco = this.options[this.selectedIndex].getAttribute("data-size");

    // Cambiar imagen del barco en pantalla según el barco seleccionado
    imgBarco.src = `src/assets/img/${barcoSeleccionado}.jpeg`;
    localStorage.setItem("tamañoBarco", tamañoBarco);

    // Si aún no se ha creado el botón de girar, se agrega al DOM
    if (!document.getElementById("btnGirarBarco")) {
      const container = document.getElementById("containerBotones");
      const botonGirar = document.createElement("button");
      botonGirar.innerHTML = "Girar Barco";
      botonGirar.classList.add("btn", "btn-primary", "btn-block", "mx-1");
      botonGirar.id = "btnGirarBarco";
      botonGirar.type = "button";
      container.appendChild(botonGirar);

      // Evento para alternar entre horizontal y vertical
      botonGirar.addEventListener("click", () => {
        let girarBarco = localStorage.getItem("girarBarco") === "true";
        localStorage.setItem("girarBarco", !girarBarco);
      });
    }
  });
}

// Crea una matriz del tablero del jugador con las posiciones donde están ubicados sus barcos
export function crearMatrizJugador() {
  let matriz = matrizTablero(); // Crear una matriz vacía

  // Recorrer los barcos y registrar sus posiciones en la matriz
  ContenedorBarcos.barcosJugador.forEach((barco) => {
    let tamañoBarco = barco.getPoscicionesBarco().length;
    barco.getPoscicionesBarco().forEach((posicion) => {
      const x = posicion[0];
      const y = posicion[1];
      matriz[x][y] = `p1-${x}-${y}`; // Guardar ID de la celda en la matriz
    });
  });

  return matriz; // Retornar la matriz con los barcos posicionados
}
