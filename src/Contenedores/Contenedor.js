import { createRequire } from 'module';
const require = createRequire(import.meta.url);

class Contenedor {
    constructor(options ,tabla){
        this.knex = require('knex')(options);
        this.tabla = tabla;
    };
    
    async save (producto) {
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        producto.fecha = fechaCreacion;
        return this.knex(this.tabla).insert(producto);
    }
    
    async getById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let objetoFiltrado = objetoContenido.filter(objeto => objeto.id == id);
        return objetoFiltrado;
    }

    async getAll () {
        return await this.knex.from(this.tabla).select('*');
    }

    async deleteById (id){
        let contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
        let objetoContenido = JSON.parse(contenido);
        let borradoObjeto = objetoContenido.filter(producto => producto.id != id);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(borradoObjeto));
    }

    async deleteAll (){
        await this.knex(this.tabla).del();
    }

    async modificarById (idParams, productoModificado) {
        let contenido = await this.knex.from(this.tabla).select('*');
        console.log(contenido)
        let objetoContenido = JSON.parse(contenido);
        let filtro = objetoContenido.some(producto => producto.id == idParams);
        let fecha = new Date();
        let fechaCreacion = `${fecha.getDate()} ${fecha.getMonth()} ${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
        productoModificado.fecha = fechaCreacion;
        let modificacionArrayProductos = [];
        if(filtro){
            productoModificado.id = idParams;
            let idModificado = idParams - 1;
            modificacionArrayProductos = objetoContenido.fill(productoModificado, idModificado, idParams);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(modificacionArrayProductos));
        }
    }
};

export default Contenedor
