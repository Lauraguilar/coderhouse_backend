let nextID = 1;

class ProductoController {
    constructor () {}
    
    agregar (data, db) {
        if (data.title === "" || typeof data.title === 'undefined') {return false}
        if (data.price === "" || typeof data.price === 'undefined') {return false}
        if (data.thumbnail === "" || typeof data.thumbnail === 'undefined') {return false}
        data.id = nextID ++;
        db.push({
            "id": data.id,
            "title": data.title,
            "price": data.price,
            "thumbnail": data.thumbnail
        });
        return data, db;
    }

    leer (db) {
        if (db.length === 0) {return false}
        return db;
    }

    leerID (id, db) {
        return db.filter(producto => producto.id === parseInt(id))[0];
    }

    actualizar (id, data, db) {
        const productoFiltrado = db.filter(producto => producto.id === parseInt(id));
        if (productoFiltrado.length === 0) {return false}
        db = db.map (producto => {
            if (producto.id === parseInt(id)) {
                producto.title = data.title,
                producto.price = data.price,
                producto.thumbnail = data.thumbnail
            }
            return producto;
        })
        return true, db;
    }

    eliminar (id, db) {
        const productoFiltrado = db.filter(producto => producto.id === parseInt(id));
        if (productoFiltrado.length === 0) {return false}
        db = db.filter(producto => producto.id !== parseInt(id));
        return true, db;
    }
}

export default ProductoController;