import { Router } from "express";
const router = Router();

import CartManager from "../manager/cart.manager.js";
import { __dirname } from "../utils.js";
const cartManager = new CartManager(`${__dirname}/data/carts.json`);
 
 router.post("/", async (req, res) => {
   try {
     const newCart = await cartManager.createCart();
     res.json(newCart);
   } catch (error) {
     res.status(500).json({error: "Error interno del servidor"});
   }
 });
 
 router.get("/:cid", async (req, res) => {
   try {
     const {cid} = req.params
     res.json(await cartManager.getCartById(cid))
   } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
   }
 });

 router.post("/:cid/product/:pid", async (req, res) => {
  try {
     const { pid } = req.params;
     const { cid } = req.params;
     const response = await cartManager.saveProductToCart(cid, pid);
     res.json(response)
  } catch (error) {
    res.status(500).json({error: "Error interno del servidor"});
  }
});

export default router;