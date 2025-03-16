class Utils
 { 
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