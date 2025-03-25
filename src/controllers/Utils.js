export default class Utils
 { 
    // Url es el html que se va a cargar
    // container es el contenedor donde se va a cargar el html
    static async loadPage(url,container) {
        try {
            
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Failed to load page");
            }
            const html = await response.text();
            if (container) {
                container.innerHTML = html;
            }
        }
        catch (error) {
            console.error(error);
        }
   
    }
    static async fetchJSON(url) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to load JSON");
        }
        return await response.json();
    }

}