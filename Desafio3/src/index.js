import express from 'express';
import fs from 'fs';

const path = './archivos/productos.txt';
const PORT = 8080;
const app = express();



async function leer(path) {
    try {
        const contenido = await fs.promises.readFile(path, 'utf-8');
        const respuesta = JSON.parse(contenido);
        return respuesta;
    }
    catch (error) { 
        console.log(error);
    }
}

const productos = await leer(path);

let items = 0;
for (const producto of productos) {
    items ++;
}


let punto1 = 0;
app.get('/items', (req, res) => {
    punto1++;
    res.json({
        "items": productos,
        "cantidad": items
    })
})

let punto2 = 0;
app.get('/item-random', (req, res) => {
    const producto = productos[Math.floor(Math.random()*productos.length)];
    punto2++;
    res.json({
        "item": producto
    })
})

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));