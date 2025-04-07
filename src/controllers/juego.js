import Utils from "./Utils.js";
import { crearMapa } from "./creacionTablero.js";
import { crearBarcosMaquina } from "./confBarcosMaquina.js";
import { ContenedorBarcos } from "../models/ContenedorBarcos.js";
import { crearMatrizJugador } from "./confBarcosJugador.js";
import { cargarUsuario } from "./login.js";
import { cargarPuntajes } from "./ranking.js";

// Función principal para iniciar el juego
export async function crearJuego() {
  cargarUsuario(); // Carga la información del usuario

  localStorage.setItem("esTurnoJugador", true); // Inicializa el turno del jugador
  const contenedorMisBarcos = document.getElementById("tableroGuerra1");
  const vistaMisBarcos = localStorage.getItem("tableroJugador"); // Mapa del jugador guardado previamente
  const casillasSeleccionadasMaquinas = [];

  // Guarda las casillas ya atacadas por la máquina
  localStorage.setItem(
    "casillasSeleccionadasMaquinas",
    JSON.stringify(casillasSeleccionadasMaquinas)
  );

  // Inyecta el mapa del jugador en el tablero de guerra
  contenedorMisBarcos.innerHTML = vistaMisBarcos;

  // Ajusta el tamaño del grid según el tablero
  const tamañoTablero = JSON.parse(localStorage.getItem("tablero"))[
    "tamañoTablero"
  ];
  contenedorMisBarcos.style.gridTemplateColumns = `repeat(${tamañoTablero}, 1fr)`;
  contenedorMisBarcos.style.gridTemplateRows = `repeat(${tamañoTablero}, 1fr)`;

  // Inicializa las matrices de los barcos
  let matrizMaquina = crearBarcosMaquina();
  let matrizJugador = crearMatrizJugador();

  // Crea el mapa del enemigo y define el evento de clic en sus casillas
  crearMapa(document.getElementById("tableroGuerra2"), "p2-", async () => {
    cargarUsuario();
    if (localStorage.getItem("esTurnoJugador") == "false") {
      alert("No es tu turno");
      return;
    }

    const idCasilla = event.target.id; // ID de la casilla clickeada

    // Ejecuta el ataque del jugador
    let leDioJugador = await ataque(
      ContenedorBarcos.barcosMaquina,
      idCasilla,
      matrizMaquina
    );
    console.log(leDioJugador);

    cargarUsuario();
    localStorage.setItem("esTurnoJugador", leDioJugador); // Cambia el turno si no acertó

    // Turno de la máquina mientras siga fallando
    while (localStorage.getItem("esTurnoJugador") == "false") {
      let leDioMaquina = await turnoMaquina(matrizJugador);
      console.log(leDioMaquina);

      localStorage.setItem("esTurnoJugador", !leDioMaquina);
    }
  });
}

// Turno de la máquina (ataque aleatorio)
async function turnoMaquina(matrizJugador) {
  const tablero = JSON.parse(localStorage.getItem("tablero"));
  const tamañoTablero = tablero["tamañoTablero"];
  let x, y;
  let casillasSeleccionadasMaquinas = JSON.parse(
    localStorage.getItem("casillasSeleccionadasMaquinas")
  );

  // Busca coordenadas que no hayan sido seleccionadas
  do {
    x = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
    y = Utils.numeroAleatorioEntre(0, tamañoTablero - 1);
  } while (casillasSeleccionadasMaquinas.some(c => c[0] === x && c[1] === y));

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

// Función que gestiona un ataque a una casilla
async function ataque(
  contenedorJugadorContrincante,
  idCasilla,
  matrizContrincante
) {
  const coordenadas = idCasilla.split("-");
  let jugador = coordenadas[0];
  let x = parseInt(coordenadas[1]);
  let y = parseInt(coordenadas[2]);
  const boton = document.getElementById(idCasilla);
  let huboImpacto = false;
  let usuario = JSON.parse(localStorage.getItem("jugador"));

  // Suma puntaje por el ataque
  usuario["score"] += calcularPuntaje(matrizContrincante, x, y);
  let ganador = false;

  if (jugador == "p2") {
    localStorage.setItem("jugador", JSON.stringify(usuario));
  }

  // Revisa si algún barco fue golpeado
  contenedorJugadorContrincante.forEach((barco) => {
    if (existeBarco(barco.getPoscicionesBarco(), [x, y])) {
      eliminarPosicion(barco, [x, y]);
      if (jugador == "p2") {
        boton.onclick = () => {
          alert("Esta posición ya ha sido atacada");
        };
      }
      matrizContrincante[x][y] += "h"; // Marca como herida
      boton.style.backgroundColor = "red";
      huboImpacto = true;
      console.log("Mapa con barcos hundidos", matrizContrincante);
      

      if (barco.getPoscicionesBarco().length == 0) {
        alert("Barco hundido");
        contenedorJugadorContrincante.splice(
          contenedorJugadorContrincante.indexOf(barco),
          1
        );
      }

      if (contenedorJugadorContrincante.length == 0) {
        const ganadorJugador = jugador === "p1" ? "p2" : "p1";
        alert(`Ganó el jugador ${ganadorJugador}`);
        ganador = true;
      }
    }
  });

  // Si ganó, se guarda el puntaje en el backend y se carga el ranking
  if (ganador) {
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

  // Si no impactó ningún barco
  if (!huboImpacto) {
    boton.style.backgroundColor = "white";
    matrizContrincante[x][y] = "b"; // Marcamos como bomba sin impacto
    boton.onclick = () => {
      alert("Esta bomba ya ha sido colocada");
    };
    return false;
  }
  return true;
}

// Calcula el puntaje del disparo
function calcularPuntaje(matrizContrincante, x, y) {
  let puntos = -1; // Valor por defecto si no se impacta
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

  // Si se acierta una parte de barco
  if (matrizContrincante[x][y] !== "a") {
    puntos = 10;
  }

  // Penaliza si el área era agua
  coordenadasCerca.forEach((element) => {
    let i = x + element[0];
    let j = y + element[1];
    if (
      i >= 0 &&
      j >= 0 &&
      i < matrizContrincante.length &&
      j < matrizContrincante.length &&
      matrizContrincante[x][y] === "a"
    ) {
      puntos = -5;
    }
  });

  return puntos;
}

// Verifica si una posición está en el barco
function existeBarco(listaPrincipal, objetivo) {
  return listaPrincipal.some(
    (par) => par[0] === objetivo[0] && par[1] === objetivo[1]
  );
}

// Elimina una posición del barco impactado
function eliminarPosicion(barco, objetivo) {
  let listaPrincipal = barco.getPoscicionesBarco();
  let listaModificado = listaPrincipal.filter(
    (b) => !(b[0] === objetivo[0] && b[1] === objetivo[1])
  );
  barco.poscicionesBarco = listaModificado;
  return barco;
}
