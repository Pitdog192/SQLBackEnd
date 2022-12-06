import config from '../config.js';
let productosDao;
let carritosDao;
let mensajesDao;
let usuariosDao;
switch (config.type) {
    case 'mongodb':
        const { default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js');
        const { default: CarritosDaoMongoDb} = await import ('./carritos/CarritosDaoMongoDb.js');
        const { default: MensajesDao} = await import ('./mensajes/mensajesDao.js');
        const { default: UsuariosDao} = await import ('./usuarios/UsuariosDao.js');
        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        mensajesDao = new MensajesDao();
        usuariosDao = new UsuariosDao();
        break;
    case 'firebase':
        const { default: ProductosDaoFirebase} = await import ('./productos/ProductosDaoFirebase.js');
        const { default: CarritosDaoFirebase} = await import ('./carritos/CarritosDaoFirebase.js');
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
}

export { productosDao, carritosDao, mensajesDao, usuariosDao }