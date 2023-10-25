import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";
import chatRouter from "./routes/chat.routes.js"
import { Server } from "socket.io";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { ioConnection } from './controllers/chat.controller.js';
// import cookieParser from 'coder2311';
// Mongodb URL : "mongodb+srv://Elimelec:coder2311@cluster0.s5pyx6d.mongodb.net/ecommerce?retryWrites=true&w=majority";


dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

//instance of server
const app = express();

//middlewares for body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected with MongoDB in URL " + MONGO_URL))
    .catch((err) => console.error(err));

//saving session in Mongo
app.use(
    session({
        store: new MongoStore({
            mongoUrl: MONGO_URL,
            ttl: 3600,
        }),
        secret: "Coderhouse",
        resave: false,
        saveUninitialized: false,
    })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());



//static files
app.use(express.static(__dirname + "/public"));

//setting handlerbars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//server http
const serverHttp = app.listen(8080, () => {
    console.log("Listening to port 8080");
});

//websocket server
const io = new Server(serverHttp);

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/sessions", sessionsRouter);
app.use("/", chatRouter)

io.on("connection", ioConnection);
//todo que el usuario que manda el msj al chat salga del usuario que esta logueado
//asignar carrito al crear usuario
//popular el carrito
//ticket al usuario