export function login(doc) {
  let paises = doc.getElementById("country");

  console.log(paises,"hola");
  
  // Función para obtener y mostrar países
  function cargarPaises() {
    fetch("http://127.0.0.1:5000/countries")     
      .then(response => response.json())
      .then( data => {
        // Recorrer los países y añadirlos al select
        console.log(data);
        
        data.forEach((pais) => {
          // Obtener clave y valor del json paises
          let code = Object.keys(pais)[0]; // codigo ejm: "AD"
          let name = pais[code]; // Nombre ejm: "andorra"
          let option = doc.createElement("option");
          option.value = code;
          option.textContent = name;
          paises.appendChild(option);
        });
      })
      .catch((error) => console.error("Error al obtener los países:", error));
  }

  cargarPaises();
}
