import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/product.router.js";
import cartsRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/view.router.js";
import morgan from "morgan";
import { __dirname } from "./utils.js";
import { Server } from "socket.io"; 
import { initMongoDB } from "./dao/mongo/connection.js";
import messagesManager from "./dao/mongo/managers/messagesManager.js";
import "dotenv/config";
import ProductManager from "./dao/filesystem/managers/products.managers.js";
const productManager = new ProductManager(`${__dirname}/dao/filesystem/data/products.json`);

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

if (process.env.PERSISTENCE === "MONGO") initMongoDB(); 

const PORT = 8080;

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer);

const messageServices = new messagesManager();

socketServer.on("connection", async (socket) => {
    console.log("Un cliente conectado");
    
    socket.emit("productos", await productManager.getProducts());

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        socket.emit("productos", await productManager.getProducts());
    })

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        socket.emit("productos", await productManager.getProducts());
    })

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
      });
      socket.on("newUser", (usuario) => {
        console.log("usuario", usuario);
        socket.broadcast.emit("broadcast", usuario);
      });
    
      socket.on("disconnect", () => {
        console.log(`Usuario con ID : ${socket.id} esta desconectado `);
      });
    
      socket.on("message", async (info) => {
        console.log(info);
        await messageServices.createMessage(info);
        socketServer.emit("chat", await messageServices.getMessages());
      });
});