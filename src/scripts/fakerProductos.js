import faker from 'faker';

const generarProducto = () => {
    return({
        id: 'product',
        product: {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.datatype.number({ max: 999 }),
            pic: faker.image.imageUrl(),
            price: faker.commerce.price(10, 2000,2),
            stock: faker.datatype.number({ max: 9999 }) 
        }
    })
}

const insertarProductos = () => {
    let productosRandom = [];
    for (let index = 0; index < 5; index++) {
        productosRandom.push(generarProducto());
    }
    return productosRandom
}

const generarMensaje = () => {
    return({
        id: 'message',
        author:{
            id: faker.datatype.number({ max: 999 }),
            name: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.datatype.number({ max: 99 }),
            alias: `${faker.name.firstName()}${faker.animal.type()}`,
            avatar: faker.image.avatar(),
        },
        text: faker.lorem.text(),
    })
}

export {generarProducto, generarMensaje, insertarProductos}