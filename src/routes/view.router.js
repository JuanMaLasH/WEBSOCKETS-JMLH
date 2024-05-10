import { Router } from "express";
const router = Router();

import { __dirname } from "../utils.js"
import ProductManager from "../manager/product.manager.js";
const productManager = new ProductManager(`${__dirname}/data/products.json`)

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

export default router;