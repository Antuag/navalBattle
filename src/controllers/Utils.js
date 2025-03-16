class Utils
 { 
    static async loadPage(url,container) {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Failed to load page");
        }
        const html = await response.text();
        if (container) {
            container.innerHTML = html;
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