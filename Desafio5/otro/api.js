import express from 'express';
import {crearRouterProductos} from './routes/productoRouter.js';

const PORT = 8080;
const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/productos", crearRouterProductos());

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));
