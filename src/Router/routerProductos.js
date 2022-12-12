import sesionMiddleware from '../Middlewares/sesionMiddle.js';
import {insertarProductos} from '../scripts/fakerProductos.js';
import {productosDao} from '../daos/index.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Router = require('router') ;
const routerProductos = Router();

routerProductos.get('/:id?', async ( req, res )=>{ //devuelve un producto según su id o todos los productos
    if(req.params.id){
        res.json(await productosDao.getById(req.params.id))
    }
    else{
        let usuario = req.session.passport.user;
        let productos = await productosDao.getAll()
        res.render('productos.ejs', {productos, usuario})
    }
})

routerProductos.post('/', sesionMiddleware, async ( req, res ) => { //recibe y agrega un producto y lo devuelve con el id asignado
    res.json(await productosDao.save(req.body))
})

routerProductos.put('/:id',sesionMiddleware, async ( req, res ) => { //recibe y actualiza un producto segun su id
    const modificacionProducto = req.body;
    res.json(await productosDao.updateProduct(req.params.id, modificacionProducto))
})

routerProductos.delete('/:id',sesionMiddleware, async ( req, res ) => { // elimina un producto segun su id
    res.json(await productosDao.deleteById(req.params.id))
})

//RUTA PARA NORMALIZACIÓN 
routerProductos.get('/api/productos-test', (req, res) => {
    res.json(insertarProductos())
})

export default routerProductos;

