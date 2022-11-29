import  express from 'express';
import session from 'express-session';
import routerProductos from './Router/routerProductos.js';
import routerCarrito from './Router/routerCarrito.js';
import { createRequire } from 'module';
import config from './config.js';
import mongoose from 'mongoose';
import socketIo from './scripts/socket.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

const require = createRequire(import.meta.url);
const { Server: IOServer} = require('socket.io');
const { Server: HttpServer}  = require('http');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongodb.url, 
        mongoOptions: advancedOptions,
        ttl: 600
    }),
    secret: 'ecommerce',
    resave: true,
    saveUninitialized: true
}))
app.use('/productos', routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', routerCarrito); // RUTA DE CARRITO

//CONECCION A MONGODBATLAS
try {
    await mongoose.connect(config.mongodb.url);
} catch (error) {
    console.log(error)
} 

//LOGIN ----------------------------
app.post('/login', (req, res) => {
    let nombreLogin = req.body.nombre;
    req.session.nombre = nombreLogin;
    res.json({nombreLogin: nombreLogin})
})

app.get('/logout', (req, res) => {
    let nombreUser = req.session.nombre
    req.session.destroy(err => {
        if(!err){
            res.json({resp: 'Logout Ok', user: nombreUser})
        } else {
            res.json({resp: 'Logout Error', error: err})
        }
    })
})
//FIN LOGIN-------------

// SOCKETS-------------------------------
socketIo(io);
// FIN DE SOCKETS-------------------------

//RESPUESTA PARA RUTAS NO IMPLEMENTADAS
app.use('*', (req, res) => {
    let path = req.params;
    res.send({ Error_ruta: `La ruta: '${path[0]}' no está implementada` });
});
const server = httpServer.listen(config.port, () => console.log(`Server escuchando, http://localhost:${config.port}`));
server.on('error', (error) => console.log(`Error: ${error}`));