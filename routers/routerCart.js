import { Router } from "express";
import Carritos from "../api/carritos.js";
import Productos from "../api/productos.js";
import isItAdmin from "../middleware/permisos.js";

export const routerCarritos = Router();

const carritos = new Carritos("./api/carritos.json");
const productos = new Productos("./api/productos.json");


routerCarritos.post("/", isItAdmin, async (req, res) => {
    res.status(201).send(await carritos.makeNewCart());
});

routerCarritos.delete("/:id", isItAdmin, async (req, res) => {
    const id = req.params.id;
    await carritos.deleteCartbyId(id) !== null
        ? res.status(201).send(`Carrito con el ID: ${id} eliminado`)
        : res.status(404).send(`Error ID:${id} no encontrado`);
});

routerCarritos.get("/:id/productos", isItAdmin, async (req, res) => {
    const id = req.params.id;
    const productos = await carritos.getProductsByCartId(id);
    productos !== null
        ? res.status(200).send(productos)
        : res.status(404).send(`Error ID:${id} no encontrado`);
});

routerCarritos.post("/:id/productos/:id_prod", isItAdmin, async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const producto = await productos.getById(id_prod);
    const carrito = await carritos.getProductsByCartId(id);
    if (producto !== null && carrito !== null) {
        res.status(201).send(await carritos.addProductToCart(id, producto));
    }
    else {
        res.status(404).send(`Error en ID:${id} y/o ID:${id_prod}, no encontrado/s`);
    }
});

routerCarritos.delete("/:id/productos/:id_prod", isItAdmin, async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const producto = await productos.getById(id_prod);
    const carrito = await carritos.getProductsByCartId(id);
    if (producto !== null && carrito !== null) {
        res.status(201).send(await carritos.deleteProductFromCart(id, producto));
    }
    else {
        res.status(404).send(`Error en ID:${id} y/o ID:${id_prod}, no encontrado/s`);
    }
});
