export  class Utils {
  //borrar es booleano, si es true borra el contenido
  static async loadPage(url, container, borrar) {
    try {
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to load page");
      }
      const html = await response.text();
      if (container) {
        if (borrar) {
          container.innerHTML = "";
        }
        let contenidoInterno = container.innerHTML;
        contenidoInterno += html;
        container.innerHTML = contenidoInterno;
      }
    } catch (error) {
      console.error(error,"hola");
    }
  }
  static async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to load JSON");
    }
    return await response.json();
  }
}
