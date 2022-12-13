import  express from 'express';
import session from 'express-session';
import routerProductos from './Router/routerProductos.js';
import routerCarrito from './Router/routerCarrito.js';
import routerLogin from './Router/routerLogin.js';
import routerProcess from './Router/routerProcess.js';
import config from './config.js';
import mongoose from 'mongoose';
import socketIo from './scripts/socket.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import checkAuth from './Middlewares/sesionMiddle.js';
import passport from './scripts/passport.js';
import { createRequire } from 'module';
import routerRandom from './Router/routerRandom.js';
const require = createRequire(import.meta.url);
mongoose.set('strictQuery', false);
const { Server: IOServer} = require('socket.io');
const { Server: HttpServer}  = require('http');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(cookieParser('ecommerce'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongodb.url,
        collectionName: 'sessions',
        mongoOptions: advancedOptions,
        ttl: 600
    }),
    secret: 'ecommerce',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/productos', checkAuth, routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', routerCarrito); // RUTA DE CARRITO
app.use('/', routerLogin); //RUTA LOGIN
app.use('/info', routerProcess)// RUTA YARGS
app.use('/api', routerRandom);//RUTA RANDOM CON FORKS

//EJS
app.set('views', './views/ejs')
app.set('view engine', 'ejs');
//CONECCION A MONGODBATLAS
try {
    await mongoose.connect(config.mongodb.url);
} catch (error) {
    console.log(error)
} 

// SOCKETS-------------------------------
socketIo(io);
// FIN DE SOCKETS-------------------------

//RESPUESTA PARA RUTAS NO IMPLEMENTADAS
app.use('*', (req, res) => {
    let path = req.params;
    res.send({ Error_ruta: `La ruta: '${path[0]}' no está implementada` });
});
const server = httpServer.listen(config.port, () => console.log(`Server escuchando, http://localhost:${config.port}/login`));
server.on('error', (error) => console.log(`Error: ${error}`));