import Contenedor from '../Contenedores/Contenedor.js';
import sesionMiddleware from '../Middlewares/sesionMiddle.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
import productosDao from '../daos/index.js';
const require = createRequire(import.meta.url);

const Router = require('router') ;
const routerProductos = Router();

const getPos = (id) =>  parseInt(id)

routerProductos.get('/:id?', async ( req, res )=>{ //devuelve un producto según su id o todos los productos
    if(req.params.id)
    res.json(await productosDao.getById(getPos(req.params.id)))
    else{
        res.json(await productosDao.getAll())
    }
})

routerProductos.post('/', sesionMiddleware, async ( req, res ) => { //recibe y agrega un producto y lo devuelve con el id asignado
    res.json(await productosDao.saveProducto(req.body))
})

routerProductos.put('/:id',sesionMiddleware, async ( req, res ) => { //recibe y actualiza un producto segun su id
    const modificacionProducto = req.body;
    res.json(await productosDao.updateProduct(getPos(req.params.id), modificacionProducto))
})

routerProductos.delete('/:id',sesionMiddleware, async ( req, res ) => { // elimina un producto segun su id
    res.json(await productosDao.deleteById(getPos(req.params.id)))
})

export default routerProductos;

