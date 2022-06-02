import express from 'express';
import {crearRouterProductos} from './routes/productoRouter.js';
import exphbs from 'express-handlebars';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import fs from 'fs';


const PORT = 8090;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer); 
let productos = [];
const messages = [];
const path = './archivos/log.txt';

let hbs = exphbs.create({ 
    extname: "hbs", 
    helpers: {
        isFalse: function (value) { 
            if (!value) {return true} else {return false}
        },
        ifeq: function (a, b, options) {
            if (a == b) {return options.fn(this)}
            return options.inverse(this);
        },
        ifnoteq: function (a, b, options) {
            if (a != b) {return options.fn(this)}
            return options.inverse(this);
        }
    }
 });


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use("/", crearRouterProductos(productos));

io.on('connection', socket => {
    console.log('Usuario conectado');

    socket.emit('listarProductos', productos);

    socket.on('cargar', () => {
        io.sockets.emit('listarProductos', productos);
    })

    // chat
    socket.emit('messages', messages)
    socket.on('new-message', data => {
        messages.push(data);
        guardar(path, data);
        io.sockets.emit('messages', messages)
    })
})

const guardar = async (path, texto) => {
    const data = JSON.stringify(texto, null,'\t');
    try {
        await fs.promises.appendFile(path, data);
    }
    catch (error) {
        console.log(error);
    }
}

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));
