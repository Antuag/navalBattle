import Utils from './Utils.js';
import  {login}  from './login.js';

class Main {
    static async main() {
        
        const container = document.getElementById('container');
        await Utils.loadPage('src/views/login.html', container);
        console.log(container);
        login(document);
       
    }
}
Main.main();


