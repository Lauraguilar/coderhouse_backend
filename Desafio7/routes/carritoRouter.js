import express from 'express';
import Producto from '../controllers/carrito.js';

function crearRouterCarrito() { 
    const router = express.Router();
    const producto = new Producto();
    const path = '../archivos/carrito.txt';

    router.get("/", (req, res) => {
        const productosActivos = producto.leer();
        if (!productosActivos) {return res.status(404).json({error: 'Carrito - no hay productos cargados'})};
        res.json(productosActivos);
    });

    router.get("/:id", (req, res) => {
        const id = req.params.id;
        const productoBuscado = producto.leerID(id);
        if (productoBuscado) {return res.json(productoBuscado)};
        res.status(404).json({error: 'Carrito - producto no encontrado'});
    })

    router.post("/:id",(req, res) => {
        const data = req.body;
        if (producto.agregar(data)) {
                producto.guardar(path);
                return res.status(201).json(data)
        };
        res.status(400).send();
    });

    router.delete("/:id", (req, res) => {
        const id = req.params.id;
        if (producto.eliminar(id)) {
                producto.guardar(path);
                return res.status(200).json({exito: 'Carrito - producto eliminado'})
        };
        res.status(400).json({error: 'Carrito - producto no existe'});
    })

    return router;
}

export {crearRouterCarrito}
