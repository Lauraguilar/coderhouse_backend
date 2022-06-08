import fs from 'fs';

let db = [];
let nextID = 1;

class ProductoController {
    constructor () {}
    
    agregar (data) {
        if (data.nombre === "" || typeof data.nombre === 'undefined') {return false}
        if (data.descripcion === "" || typeof data.descripcion === 'undefined') {return false}
        if (data.codigo === "" || typeof data.codigo === 'undefined') {return false}
        if (data.foto === "" || typeof data.foto === 'undefined') {return false}
        if (data.price === "" || typeof data.price === 'undefined') {return false}
        if (data.stock === "" || typeof data.stock === 'undefined') {return false}
        data.id = nextID ++;
        db.push({
            "id": data.id,
            "timestamp": Date.now(),
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "codigo": data.codigo,
            "foto": data.foto,
            "price": data.price,
            "stock": data.stock
        });
        return data;
    }

    leer () {
        if (db.length === 0) {return false}
        return db;
    }

    leerID (id) {
        return db.filter(producto => producto.id === parseInt(id))[0];
    }

    actualizar (id, data) {
        const productoFiltrado = db.filter(producto => producto.id === parseInt(id));
        if (productoFiltrado.length === 0) {return false}
        db = db.map (producto => {
            if (producto.id === parseInt(id)) {
                producto.timestamp = Date.now(),
                producto.nombre = data.nombre,
                producto.descripcion = data.descripcion,
                producto.codigo = data.codigo,
                producto.foto = data.foto,
                producto.price = data.price,
                producto.stock = data.stock
            }
            return producto;
        })
        return true;
    }

    eliminar (id) {
        const productoFiltrado = db.filter(producto => producto.id === parseInt(id));
        if (productoFiltrado.length === 0) {return false}
        db = db.filter(producto => producto.id !== parseInt(id));
        return true;
    }

    async guardar (path) {
        const data = JSON.stringify(db, null,'\t');
        try {
            await fs.promises.appendFile(path, data);
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default ProductoController;