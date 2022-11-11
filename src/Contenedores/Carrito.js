import fs from 'fs'; 

class Carrito {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async manejarArchivo () { // LEE TODOS LOS CARRITOS
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        return objetoContenido;
    }

    async save (carrito) { // CREA UN CARRITO 
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        carrito.fecha = fechaCreacion;
        let id = objetoContenido.length + 1;
        carrito.id = id;
        objetoContenido.push(carrito);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(objetoContenido));
    }

    async deleteById (id){ // BORRARIA UN CARRITO POR ID
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let borradoObjeto = objetoContenido.filter(carrito => carrito.id != id);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(borradoObjeto));
    }

    async agregarProductos (idParams, producto) {
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let filtro = objetoContenido.some(carrito => carrito.id == idParams);
        let modificacionArrayProductos = [];
        if(filtro){
            let busquedaCarrito = objetoContenido.filter(carrito => carrito.id == idParams);
            busquedaCarrito[idParams - 1].productos.push(producto[0])
            busquedaCarrito.id = idParams;
            let idModificado = idParams - 1;
            modificacionArrayProductos = objetoContenido.fill(busquedaCarrito, idModificado, idParams);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(modificacionArrayProductos[0]));
        }
    }

    async eliminarProducto(idCarrito, idProducto){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let filtroCarrito = objetoContenido.filter(carrito => carrito.id == idCarrito);
        let filtroProducto = filtroCarrito[0].productos.filter(producto => producto.id == idProducto);
        let indexProducto = filtroCarrito[0].productos.indexOf(filtroProducto[0]);
        filtroCarrito[0].productos.splice(indexProducto, idProducto);
        let modificacionArrayProductos = [];
        let idModificado = idCarrito - 1;
        modificacionArrayProductos = objetoContenido.fill(filtroCarrito, idModificado, idCarrito);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(modificacionArrayProductos[0]));
    }
}

export default Carrito;