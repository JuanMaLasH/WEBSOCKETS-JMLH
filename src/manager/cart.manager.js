import { __dirname } from "../utils.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

import ProductManager from "./product.manager.js";
const productManager = new ProductManager(`${__dirname}/data/products.json`);

export default class CartManager {
  constructor(path) {
    this.carts = []
    this.path = path;
  }

  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const readCartsJSON = await fs.promises.readFile(this.path, "utf8");
        if (readCartsJSON.length > 0) {
        this.carts = JSON.parse(readCartsJSON)
        return this.carts; }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: []
      };
      this.carts.push(cart);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = this.carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(idCart, idProduct) {
    try {
      const prodExist = await productManager.getProductById(idProduct); 
      if(!prodExist) return console.log('product not exist');
      const cartExist = await this.getCartById(idCart); 
      if(!cartExist) return console.log('cart not exist');
      const existProdInCart = cartExist.products.find((prod) => prod.id === idProduct);
      if(!existProdInCart) {
        const product = {
          id: idProduct,
          quantity: 1
        };
        cartExist.products.push(product);
      } else existProdInCart.quantity++;
      const updatedCarts = this.carts.map((cart) => {
        if(cart.id === idCart) return cartExist;
        return cart
      })
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExist;
    } catch (error) {
      console.log(error)
    }
  }
}