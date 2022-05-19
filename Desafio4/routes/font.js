import express from 'express';
import path from 'path';

function crearRouterFont() { 
    const routerFont = express.Router();

    routerFont.get("/", (req, res) => {
        res.sendFile(path.resolve("../views/home.html"));
    })

    return routerFont;
}

export {crearRouterFont}