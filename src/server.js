import  express from 'express';
import routerProductos from './Router/routerProductos.js';
import routerCarrito from './Router/routerCarrito.js';
import { createRequire } from 'module';
import config from './config.js';
import mongoose from 'mongoose';

const require = createRequire(import.meta.url);
const { Server: HttpServer}  = require('http');
const app = express();
const httpServer = new HttpServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/productos', routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', routerCarrito); // RUTA DE CARRITO

//CONECCION A MONGODBATLAS
try {
    await mongoose.connect(config.mongodb.url);
} catch (error) {
    console.log(error)
} 

//RESPUESTA PARA RUTAS NO IMPLEMENTADAS
app.use('*', (req, res) => {
    let path = req.params;
    res.send({ Error_ruta: `La ruta: '${path[0]}' no está implementada` });
});
const server = httpServer.listen(config.port, () => console.log(`Server escuchando, http://localhost:${config.port}`));
server.on('error', (error) => console.log(`Error: ${error}`));