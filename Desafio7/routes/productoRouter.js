import express from 'express';
import Producto from '../controllers/products.js';

function crearRouterProductos(admin) { 
    const router = express.Router();
    const producto = new Producto();
    const path = '../archivos/productos.txt';

    router.get("/", (req, res) => {
        const productosActivos = producto.leer();
        if (!productosActivos) {return res.status(404).json({error: 'no hay productos cargados'})};
        res.json(productosActivos);
    });

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        const productoBuscado = producto.leerID(id);
        if (productoBuscado) {return res.json(productoBuscado)};
        res.status(404).json({error: 'producto no encontrado'});
    })

    router.post("/",(req, res) => {
        if (!admin) {return res.status(401).json({error: 'Accion no autorizada'})}
        const data = req.body;
        if (producto.agregar(data)) {
                producto.guardar(path);
                return res.status(201).json(data);
        };
        res.status(400).send();
    });

    router.delete("/:id", (req, res) => {
        if (!admin) {return res.status(401).json({error: 'Accion no autorizada'})}
        const id = req.params.id;
        if (producto.eliminar(id)) {
                producto.guardar(path);
                return res.status(200).json({exito: 'producto eliminado'});
        };
        res.status(400).json({error: 'producto no existe'});
    })

    router.put("/:id", (req, res) => {
        if (!admin) {return res.status(401).json({error: 'Accion no autorizada'})}
        const id =req.params.id;
        const data = req.body;
        if (producto.actualizar(id, data)) {
                producto.guardar(path);
                return res.status(201).json(data)
        };
        res.status(400).json({error: 'producto NO actualizado'});
    })

    return router;
}

export {crearRouterProductos}
