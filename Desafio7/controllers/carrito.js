import fs from 'fs';

let carrito = [];

class ProductoController {
    constructor () {}
    
    agregar (data) {
        if (data.producto === "" || typeof data.producto === 'undefined') {return false}
        if (data.id === "" || typeof data.id === 'undefined') {return false}
        carrito.push({
            "id": data.id,
            "timestamp": Date.now(),
            "producto": data.producto
        });
        return data;
    }

    leer () {
        if (carrito.length === 0) {return false}
        return carrito;
    }

    leerID (id) {
        return carrito.filter(producto => producto.id === parseInt(id))[0];
    }

    eliminar (id) {
        const productoFiltrado = carrito.filter(producto => producto.id === parseInt(id));
        if (productoFiltrado.length === 0) {return false}
        carrito = carrito.filter(producto => producto.id !== parseInt(id));
        return true;
    }

    async guardar (path) {
        const data = JSON.stringify(carrito, null,'\t');
        try {
            await fs.promises.appendFile(path, data);
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default ProductoController;