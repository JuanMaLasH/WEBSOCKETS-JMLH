import { Router } from "express";
const router = Router();

import { __dirname } from "../utils.js"
import ProductManager from "../manager/product.manager.js";
const productManager = new ProductManager(`${__dirname}/data/products.json`);

import { bodyValidator } from "../middlewares/body.validator.js";

router.get("/", async (req, res) => {
  try {
      const product = await productManager.getProducts();
      let limit = parseInt(req.query.limit);
      if (limit >= 0) {
          let newArrayOfProducts = product.slice (0, limit)
          res.status(200).json(newArrayOfProducts);
      } else {
          res.status(200).json(product);
      }
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
});

router.post("/", [bodyValidator], async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    if (!product) res.status(404).json({ msg: "Product not found" });
    else res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productUpd = await productManager.updateProduct(req.body, pid);
    if (!productUpd) res.status(404).json({ msg: "Error updating product" });
    res.status(200).json(productUpd);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const delProduct = await productManager.deleteProduct(pid);
    if(!delProduct) res.status(404).json({ msg: "Error delete product" });
    else res.status(200).json({msg : `Product id: ${pid} deleted successfully`})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default router;