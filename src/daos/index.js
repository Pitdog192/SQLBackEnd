import config from '../config.js';
let productosDao;
let carritosDao;
switch (config.type) {
    case 'mongodb':
        const { default: ProductosDaoMongoDb} = await import ('./productos/ProductosDaoMongoDb.js');
        const { default: CarritosDaoMongoDb} = await import ('./carritos/CarrritosDaoMongoDb.js');
        productosDao = new ProductosDaoMongoDb();
        carritosDao = new CarritosDaoMongoDb();
        break;
    case 'firebase':
        const { default: ProductosDaoFirebase} = await import ('./productos/ProductosDaoFirebase.js');
        const { default: CarritosDaoFirebase} = await import ('./carritos/CarrritosDaoFirebase.js');
        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break;
}

export default { productosDao, carritosDao }