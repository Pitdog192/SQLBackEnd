import Carrito from '../Contenedores/Carrito.js';
import Contenedor from '../Contenedores/Contenedor.js';
import sesionMiddleware from '../Middlewares/sesionMiddle.js';
//NECESARIO PARA USAR REQUIRE EN ECS6
import { createRequire } from 'module';
import carritosDao from '../daos/index.js'
const require = createRequire(import.meta.url);

const Router = require('router') ;
const routerCarrito = Router();

routerCarrito.post('/', async (req, res) => { //CREA UN CARRITO Y DEVUELVE SU ID
    //DEBERIA SER res.json(await carritosDao.saveCarritos())
    let carrito= {
        productos: []
    };
    (async () => await claseCarrito.save(carrito))();
    res.json({
        carrito: "Carrito creado"
    })
})

routerCarrito.delete('/:id', async (req, res)=> { //VACIA UN CARRITO Y LO ELIMINA
    //DEBERIA SER res.json(await carritosDao.deleteCarrito(req.params.id))
    let paramId = parseInt(req.params.id);
    let filtroCarritos = carrito.filter(carrito => carrito.id == paramId)
    if(filtroCarritos){
        (async () => await claseCarrito.deleteById(paramId))();
        res.json({
            respuesta: "Carrito eliminado con exito"
        })
    } else {
        res.json({
            respuesta: "Carrito no encontrado"
        })
    }
})

routerCarrito.get('/:id/productos', async (req, res) => { //me permite listar los productos del carrito

    let paramId = parseInt(req.params.id);
    let filtroCarritos = carrito.filter(carrito => carrito.id == paramId);
    const filtro = carrito.some(carri => carri.id == paramId);
    if(filtro){
        res.json({
            carrito: filtroCarritos
        })
    } else {
        res.json({
            respuesta: "No se encontro el carrito"
        })
    }
})

routerCarrito.post('/:id/productos', async (req, res) => { //para incorporar productos al carrito por su id de producto
    let paramId = parseInt(req.params.id);
    let idProducto = req.body.id;
    let productoAgregar = productos.filter(producto => producto.id == idProducto);
    const filtro = carrito.some(carri => carri.id == paramId);
    if(filtro){
        (async () => claseCarrito.agregarProductos(paramId, productoAgregar))();
        res.json({
            respuesta: "Producto agregado"
        })
    } else {
        res.json({
            respuesta: "No se pudo agregar el producto"
        })
    }
})

routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => { //eliminar un producto del carrito por su id de carrito y de producto
    let idCarrito = parseInt(req.params.id);
    let idProducto = parseInt(req.params.id_prod);
    let busquedaCarrito = carrito.some(carri => carri.id == idCarrito);
    if(busquedaCarrito){
        (async () => await claseCarrito.eliminarProducto(idCarrito, idProducto))();
        res.json({
            respuesta: "Producto eliminado"
        })
    } else {
        res.json({
            respuesta: "No se puede realizar"
        })
    }
})


export default routerCarrito;