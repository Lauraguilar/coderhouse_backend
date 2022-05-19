import express from 'express';
import {crearRouterProductos} from '../routes/productoRouter.js';
import {crearRouterFont} from '../routes/font.js';


const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos", crearRouterProductos());
app.use("/web", crearRouterFont());

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));
