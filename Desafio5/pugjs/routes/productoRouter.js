import express from 'express';
import Producto from '../controllers/products.js';

function crearRouterProductos() { 
        const router = express.Router();
        const producto = new Producto();

        router.get("/vista", (req, res) => {
                const productosActivos = producto.leer();     
                res.render('vista.pug', {mensaje: productosActivos});
        });

        router.get("/vista/cargar", (req, res) => {    
                res.render('cargar.pug');
        });

        router.get("/", (req, res) => {
                const productosActivos = producto.leer();
                if (!productosActivos) {return res.status(404).json({error: 'no hay prodructos cargados'})};
                res.json(productosActivos);
        });

        router.get("/:id", (req, res) => {
                const id = req.params.id;
                const productoBuscado = producto.leerID(id);
                if (productoBuscado) {return res.json(productoBuscado)};
                res.status(404).json({error: 'producto no encontrado'});
        })

        router.post("/",(req, res) => {
                const data = req.body;
                console.log(data);
                if (producto.agregar(data)) {
                        if (data.form === "1") return res.redirect("/api/productos/vista/cargar")
                        return res.status(201).json(data)
                };
                res.status(400).send();
        });

        router.delete("/:id", (req, res) => {
                const id = req.params.id;
                if (producto.eliminar(id)) {return res.status(200).json({exito: 'producto eliminado'})};
                res.status(400).json({error: 'producto no existe'});
        })

        router.put("/:id", (req, res) => {
                const id =req.params.id;
                const data = req.body;
                if (producto.actualizar(id, data)) {return res.status(201).json(data)};
                res.status(400).json({error: 'producto NO actualizado'});
        })

        return router;
}

export {crearRouterProductos}
