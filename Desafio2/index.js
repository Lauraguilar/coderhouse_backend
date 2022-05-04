const fs = require('fs');
const path = './archivos/productos.txt';
let nextId = 1;

class Archivo {

    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = nextId++;
    }

    async leer(path) {
        try {
            if (fs.existsSync(path)) {
                const contenido = await fs.promises.readFile(path, 'utf-8');
                console.log(contenido)
            } else {
                const contenido = [];
                console.log(contenido);
            }
;
        }
        catch (error) { 
            console.log(error);
        }
    }

    async guardar(path, texto) {
        const data = JSON.stringify(texto, null,'\t');
        try {
            await fs.promises.appendFile(path, data);
            console.log('agregado!');
        }
        catch (error) {
            console.log(error);
        }
    }

    async borrar(path) {
        try {
            await fs.promises.unlink(path);
        }
        catch (error) {
            console.log (error);
        }
    }
}



const arch = new Archivo('Escuadra', 123.45, 'https://sites.google.com/site/planimetriafcyt/_/rsrc/1426009125136/elementos-de-dibujo/escuadras/escuadras2.png');
const arch2 = new Archivo('Calculadora', 234.56, 'https://pardohogar.vteximg.com.br/arquivos/ids/159598-1280-852/CLACU-01.jpg?v=636863572585170000');
const arch3 = new Archivo('Globo Terraqueo', 345.67, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgxcgNfOvpL8xlBWwD0HVORx7LSyFJcCtYGQ&usqp=CAU');

arch.leer(path);

arch.guardar(path, arch);
arch2.guardar(path, arch2);
arch3.guardar(path, arch3);

//arch.borrar(path);