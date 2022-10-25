import  express from 'express';
import routerProductos from './src/Router/routerProductos.js';
import routerCarrito from './src/Router/routerCarrito.js';
import { createRequire } from 'module';
import Contenedor from './utils/Contenedor.js';
import ContenedorMensajes from './utils/ContenedorMensajes.js';
import options from './utils/MariaDBConnection.js';
import optionsSqlite from './utils/SQLite3Connection.js';

let contenedor = new Contenedor(options, 'productos');
let contenedorMensaje = new ContenedorMensajes(optionsSqlite, 'mensajes');

const require = createRequire(import.meta.url);
const { Server: HttpServer}  = require('http');
const { Server: IOServer} = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use('/productos', routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', routerCarrito); // RUTA DE CARRITO

async function callAsyncFunctionProductos() {
    let productos = await contenedor.getAll();
    return productos
}

async function callAsyncFunctionMensajes() {
    let mensajes = await contenedorMensaje.getAll();
    return mensajes
}
// SOCKETS-------------------------------
io.on('connection', socket => {
    console.log('Usuario conectado');
    callAsyncFunctionProductos().then(productos => {
        socket.emit('productos', productos);
    })
    
    socket.on('nuevoProducto', nuevoProducto => {
        (async() => await contenedor.save(nuevoProducto))();
        callAsyncFunctionProductos().then(producto => {
            io.sockets.emit('productos', producto);
        })
        .catch(err => console.error(err));
        
    })
    
    callAsyncFunctionMensajes().then(mensajes => {
        socket.emit('mensajes', mensajes);
    })
    socket.on('nuevoMensaje', mensaje =>{
        (async () => await contenedorMensaje.save(mensaje))();
        callAsyncFunctionMensajes().then(mensaje => {
            io.sockets.emit('mensajes', mensaje);
        }).catch(err => console.error(err))
    })
})
// FIN DE SOCKETS-------------------------

const server = httpServer.listen(port, () => console.log(`Server escuchando, http://localhost:${port}`));
server.on('error', (error) => console.log(`Error: ${error}`));