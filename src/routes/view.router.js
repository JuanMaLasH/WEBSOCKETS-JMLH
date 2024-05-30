import { Router } from "express";
const router = Router();

import { __dirname } from "../utils.js"
import ProductManager from "../dao/filesystem/managers/products.managers.js";
const productManager = new ProductManager(`${__dirname}/dao/filesystem/data/products.json`)

router.get("/", async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        res.render("home", {productos:productos});
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
})

router.get("/messages", (req, res) => {
    res.render("messages")
});

export default router;