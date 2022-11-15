import Carrito from '../Contenedores/Carrito.js';
import Contenedor from '../Contenedores/Contenedor.js';
import sesionMiddleware from '../Middlewares/sesionMiddle.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
import {carritosDao} from '../daos/index.js';
import { productosDao } from '../daos/index.js';
const require = createRequire(import.meta.url); 

const Router = require('router') ;
const routerCarrito = Router();

routerCarrito.post('/', async (req, res) => { //CREA UN CARRITO Y DEVUELVE SU ID
    res.json(await carritosDao.save())
})

routerCarrito.delete('/:id', async (req, res)=> { //VACIA UN CARRITO Y LO ELIMINA
    res.json(await carritosDao.deleteById(req.params.id))
})

routerCarrito.get('/:id/productos', async (req, res) => { //me permite listar los productos del carrito
    res.json(await carritosDao.getById(req.params.id))
})

routerCarrito.post('/:id/productos', async (req, res) => { //para incorporar productos al carrito por su id de producto
    res.json({resp: "aun sin realizar" })
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => { //eliminar un producto del carrito por su id de carrito y de producto
    res.json({resp: "aun sin realizar"})
})

export default routerCarrito;