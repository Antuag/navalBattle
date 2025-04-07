import Utils from "./Utils.js";
import { crearMapa } from "./creacionTablero.js";
import { crearBarcosMaquina } from "./confBarcosMaquina.js";
import { ContenedorBarcos } from "../models/ContenedorBarcos.js";
import { crearMatrizJugador } from "./confBarcosJugador.js";
import { cargarUsuario } from "./login.js";
import { cargarPuntajes } from "./ranking.js";

export async function crearJuego() {
  cargarUsuario();

  localStorage.setItem("esTurnoJugador", true);
  const contenedorMisBarcos = document.getElementById("tableroGuerra1");
  const vistaMisBarcos = localStorage.getItem("tableroJugador");
  const casillasSeleccionadasMaquinas = [];
  localStorage.setItem(
    "casillasSeleccionadasMaquinas",
    JSON.stringify(casillasSeleccionadasMaquinas)
  );

  ///Aca se inyecta el mapa que ya tiene los barcos ubicados a la nueva pagina
  contenedorMisBarcos.innerHTML = vistaMisBarcos;
  ///Con eso se mantiene el esitlo que lleva el mapa sin importar el tamaño
  const tamañoTablero = JSON.parse(localStorage.getItem("tablero"))[
    "tamañoTablero"
  ];
  contenedorMisBarcos.style.gridTemplateColumns = `repeat(${tamañoTablero}, 1fr)`;
  contenedorMisBarcos.style.gridTemplateRows = `repeat(${tamañoTablero}, 1fr)`;

  let matrizMaquina = crearBarcosMaquina();
  let matrizJugador = crearMatrizJugador();

  crearMapa(document.getElementById("tableroGuerra2"), "p2-", async () => {
    cargarUsuario();
    if (localStorage.getItem("esTurnoJugador") == "false") {
      alert("No es tu turno");
      return;
    }
    const idCasilla = event.target.id;
    let leDioJugador = await ataque(
      ContenedorBarcos.barcosMaquina,
      idCasilla,
      matrizMaquina
    );
    console.log(leDioJugador);

    cargarUsuario();
    localStorage.setItem("esTurnoJugador", leDioJugador);
    while (localStorage.getItem("esTurnoJugador") == "false") {
      let leDioMaquina = await turnoMaquina(matrizJugador);
      console.log(leDioMaquina);

      localStorage.setItem("esTurnoJugador", !leDioMaquina);
    }
  });
}

async function turnoMaquina(matrizJugador) {
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamañoTablero = tablero["tamañoTablero"];
  let x = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
  let y = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
  const casillasSeleccionadasMaquinas = JSON.parse(
    localStorage.getItem("casillasSeleccionadasMaquinas")
  );
  casillasSeleccionadasMaquinas.forEach((element) => {
    if (element[0] == x && element[1] == y) {
      return false;
    }
  });
  console.log("hola");
  casillasSeleccionadasMaquinas.push([x, y]);
  localStorage.setItem(
    "casillasSeleccionadasMaquinas",
    JSON.stringify(casillasSeleccionadasMaquinas)
  );
  return await ataque(
    ContenedorBarcos.barcosJugador,
    `p1-${x}-${y}`,
    matrizJugador
  );
}

async function ataque(
  contenedorJugadorContrincante,
  idCasilla,
  matrizContrincante
) {
  const coordenadas = idCasilla.split("-");
  let jugador = coordenadas[0];
  console.log(jugador);
  let x = parseInt(coordenadas[1]);
  let y = parseInt(coordenadas[2]);
  const boton = document.getElementById(idCasilla);
  let posciconHundida = false;
  let usuario = JSON.parse(localStorage.getItem("jugador"));
  usuario["score"] += calcularPuntaje(matrizContrincante, x, y);
  let ganador = false;
  if (jugador == "p2") {
    localStorage.setItem("jugador", JSON.stringify(usuario));
  }
  contenedorJugadorContrincante.forEach((barco) => {
    if (existeBarco(barco.getPoscicionesBarco(), [x, y])) {
      eliminarPosicion(barco, [x, y]);
      if (jugador == "p2") {
        boton.onclick = () => {
          alert("Esta posicion ya ha sido atacada");
        };
      }
      matrizContrincante[x][y] += "h";
      console.log(matrizContrincante);
      posciconHundida = true;
      console.log(jugador);
      boton.style.backgroundColor = "red";

      if (barco.getPoscicionesBarco().length == 0) {
        alert("Barco hundido");
        contenedorJugadorContrincante.splice(
          contenedorJugadorContrincante.indexOf(barco),
          1
        );
      }
      if (contenedorJugadorContrincante.length == 0) {
        alert(`Gano el jugador ${jugador}`);
        ganador = true;
      }
    }
  });
  if (ganador) {
    console.log(JSON.stringify(usuario));
    usuario["score"] = parseInt(usuario["score"]);
    await fetch("http://127.0.0.1:5000/score-recorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    await Utils.loadPage("src/views/ranking.html", container, true);
    cargarPuntajes();
  }
  if (!posciconHundida) {
    console.log(matrizContrincante);
    boton.style.backgroundColor = "white";
    matrizContrincante[x][y] = "b";
    boton.onclick = () => {
      alert("Esta bomba ya ha sido colocada");
    };
    return false;
  }
  return true;
}
function calcularPuntaje(matrizContrincante, x, y) {
  let puntos = -1;
  const coordenadasCerca = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
  if (matrizContrincante[[x]][y] != "a") {
    puntos = 10;
  }
  coordenadasCerca.forEach((element) => {
    let i = x + element[0];
    let j = y + element[1];
    if (matrizContrincante[x][y] == "a") {
      puntos = -5;
    }
  });
  return puntos;
}

function existeBarco(listaPrincipal, objetivo) {
  return listaPrincipal.some(
    (par) => par[0] === objetivo[0] && par[1] === objetivo[1]
  );
}
function eliminarPosicion(barco, objetivo) {
  let listaPrincipal = barco.getPoscicionesBarco();
  let listaModificado = listaPrincipal.filter(
    (b) => !(b[0] === objetivo[0] && b[1] === objetivo[1])
  );
  barco.poscicionesBarco = listaModificado;
  return barco;
}
