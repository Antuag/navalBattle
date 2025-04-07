import { crearJuego } from "./juego.js";
import { cargarClima } from "./clima.js";
import Utils from "./Utils.js";
import { crearMapa } from "./creacionTablero.js";
import { Barco } from "../models/Barco.js";
import { ContenedorBarcos } from "../models/ContenedorBarcos.js";
import { matrizTablero } from "./creacionTablero.js";

export function configuracionPosBarcos() {
  let contenedor = document.getElementById("tableroGuerra3");
  localStorage.setItem("girarBarco", false);
  crearMapa(contenedor, "p1-", async (idCasilla) => {

    const tablero = JSON.parse(localStorage.getItem("tablero"));
    const tamañoTablero = tablero["tamañoTablero"];
    const selectBarco = document.getElementById("selectBarco");
    let tamañoBarco = parseInt(
      selectBarco.options[selectBarco.selectedIndex].getAttribute("data-size")
    );
    const coordenadas = idCasilla.split("-");

    let x = parseInt(coordenadas[1]);
    let y = parseInt(coordenadas[2]);
    const girarBarco = localStorage.getItem("girarBarco");
    //Verifica que no tenga solapamiento con otro barco
    if (girarBarco == "true") {
      const finalX = x + tamañoBarco;
      if (finalX >= tamañoTablero) {
        alert(
          "No se puede colocar el barco en esa posicion, ya que se sale del tablero"
        );
        return;
      }
      for (let i = x; i < finalX; i++) {
        if (
          document.getElementById(`p1-${i}-${y}`).style.backgroundColor != ""
        ) {
          alert(
            "No se puede colocar el barco en esa posicion, ya que se solapa con otro barco"
          );
          return;
        }
      }
    } else {
      const finalY = y + tamañoBarco;
      if (finalY >= tamañoTablero) {
        alert(
          "No se puede colocar el barco en esa posicion, ya que se sale del tablero"
        );
        return;
      }
      for (let i = y; i < finalY; i++) {
        if (
          document.getElementById(`p1-${x}-${i}`).style.backgroundColor != ""
        ) {
          alert(
            "No se puede colocar el barco en esa posicion, ya que se solapa con otro barco"
          );
          return;
        }
      }
    }

    if (!tamañoBarco) {
      alert("Por favor, selecciona un barco primero.");
      return;
    }
    var colorBarco = document.getElementById("colorBarcos").value;

    localStorage.setItem("coordenadas", JSON.stringify(x, y));
    let barco = new Barco();
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
    ContenedorBarcos.barcosJugador.push(barco);

    //Se verifica que si ya no hay mas barcos que poner pase a la seccion de jugar

    //Se modifica el option para que se introduzcan
    let option = selectBarco.options[selectBarco.selectedIndex];

    let cantidadBarco = parseInt(option.getAttribute("cantidad"));
    option.setAttribute("cantidad", cantidadBarco - 1);

    if (cantidadBarco - 1 == 0) {
      selectBarco.remove(selectBarco.selectedIndex);
    }
    //se  resetea para que cuando se ingrese el barco vuelva todo por defecto

    selectBarco.selectedIndex = 0;
    document.getElementById("imgBarco").src = "src/styles/img/cheems.png";

    if (selectBarco.length == 1) {
      localStorage.setItem(
        "tableroJugador",
        (document.getElementById("tableroGuerra3").innerHTML),
      ),

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
      cargarClima();
      crearJuego();
    }
  });
}

function pintarBarcoEje(j, evento) {
  let tamañoBarco = parseInt(
    selectBarco.options[selectBarco.selectedIndex].getAttribute("data-size")
  );

  for (let i = j; i < tamañoBarco + j; i++) {
    evento(i);
  }
}

export function seleccionBarcos() {
  const selectBarco = document.getElementById("selectBarco");
  const imgBarco = document.getElementById("imgBarco");

  selectBarco.addEventListener("change", function () {
    let barcoSeleccionado = this.value;
    let tamañoBarco =
      this.options[this.selectedIndex].getAttribute("data-size");

    imgBarco.src = `src/styles/img/${barcoSeleccionado}.jpeg`;
    localStorage.setItem("tamañoBarco", tamañoBarco);

    if (!document.getElementById("btnGirarBarco")) {
      const container = document.getElementById("containerBotones");
      const botonGirar = document.createElement("button");
      botonGirar.innerHTML = "Girar Barco";
      botonGirar.classList.add("btn", "btn-primary", "btn-block", "mx-1");
      botonGirar.id = "btnGirarBarco";
      botonGirar.type = "button";
      container.appendChild(botonGirar);

      botonGirar.addEventListener("click", () => {
        let girarBarco = localStorage.getItem("girarBarco") === "true";
        localStorage.setItem("girarBarco", !girarBarco);
      });
    }
  });
}

export function crearMatrizJugador() {
  let matriz = matrizTablero();

  ContenedorBarcos.barcosJugador.forEach((barco) => {
    let tamañoBarco = barco.getPoscicionesBarco().length;
    barco.getPoscicionesBarco().forEach((posicion) => {
      const x = posicion[0];
      const y = posicion[1];
      matriz[x][y] = `p1-${x}-${y}`;
    });
  });
  return matriz;
}
