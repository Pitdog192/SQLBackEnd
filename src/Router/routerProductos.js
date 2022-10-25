import Contenedor from '../../utils/Contenedor.js';
import sesionMiddleware from '../Middlewares/sesionMiddle.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
import options from '../../utils/MariaDBConnection.js';
const require = createRequire(import.meta.url);

const Router = require('router') ;
const routerProductos = Router();


let contenedor = new Contenedor(options, 'productos'); // constructor de la clase contenedor que maneja el archivo productos.txt
let productos =  await contenedor.getAll();  // lee el json de productos y lo convierte en un objeto javascript

routerProductos.get('/:id?', ( req, res )=>{ //devuelve un producto según su id o todos los productos
    const pos = parseInt(req.params.id);
    const filtro = productos.some(producto => producto.id == pos);
    if(!pos){
        res.json({
            productos
        })
    } else if(filtro) {
        let busquedaProducto = productos.filter(producto => producto.id == pos)
        res.json({
            producto: busquedaProducto
        }); 
    } else {
        res.json({
            respuesta: "El producto no existe"
        })
    }
})

routerProductos.post('/', sesionMiddleware, ( req, res ) => { //recibe y agrega un producto y lo devuelve con el id asignado
    const productoBody = req.body;
    (async () => await contenedor.save(productoBody))();
    res.json({
        productoGuardado: productoBody
    }); 
})

routerProductos.put('/:id',sesionMiddleware, ( req, res ) => { //recibe y actualiza un producto segun su id
    const pos = parseInt(req.params.id);
    const modificacionProducto = req.body;
    const filtro = productos.some(producto => producto.id == pos);
    if(filtro){
        (async () => await contenedor.modificarById(pos, modificacionProducto))();
        res.json({
            exito: "Producto modificado con éxito"
        })
    }
})

routerProductos.delete('/:id',sesionMiddleware, ( req, res ) => { // elimina un producto segun su id
    const pos = parseInt(req.params.id);
    const filtro = productos.some(producto => producto.id == pos);
    if(filtro){
        (async () => await contenedor.deleteById(pos))();
        res.json({
            respuestaPos: "Producto eliminado con éxito"
        })
    }
})

export default routerProductos;

