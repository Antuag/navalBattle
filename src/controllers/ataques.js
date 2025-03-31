export function ataquesBarcos(coordenadas) {
    let boton = document.getElementById(coordenadas);
    boton.style.backgroundColor = "#a70499"; // Cambia el color del botón al hacer clic
    console.log(`Coordenadas de ataque: ${coordenadas}`);
    const jugador = JSON.parse(localStorage.getItem("jugador"));
    const puntaje = jugador["puntaje"];
    const nuevoPuntaje = puntaje + 30;
    jugador["puntaje"] = nuevoPuntaje;
    localStorage.setItem("jugador", JSON.stringify(jugador));
    document.getElementById("score").innerText = nuevoPuntaje;
  
}