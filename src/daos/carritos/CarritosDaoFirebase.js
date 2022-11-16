import Container from "../../Contenedores/ContenedorFirestore.js";
import ProductosDaoFirebase from "../productos/ProductosDaoFirebase.js";
import pkg from 'firebase-admin';
const { firestore } = pkg;

let productos = new ProductosDaoFirebase();

class CarritosDaoFirebase extends Container{
    constructor(){
        super('carritos')
    }
    async guardarCarrito(carrito = {productos: []}){
        return super.save(carrito)
    }
    async getProductosCarrito(id){
		try{
			let doc = await this.collection.doc(id).get();
			let productos = doc.data().productos;
			return productos;
		} catch(err){
			throw new Error(`Error al obtener productos del carrito: ${err}`)
		}
	}
    async insertProducto(idCarrito, idProducto){
        try{
            let producto = await productos.getById(idProducto);
            producto.id = idProducto;
            let carrito = await this.collection.doc(idCarrito).update('productos', firestore.FieldValue.arrayUnion(producto), {merge:true});
            return carrito
        } catch(err){
            throw new Error(`Error al insertar productos en el carrito: ${err}`)
        }
    }
    async deleteProducto(idCarrito, idProducto){
        try{
            let producto = await productos.getById(idProducto);
            producto.id = idProducto;
            let carrito = await this.collection.doc(idCarrito).update('productos', firestore.FieldValue.arrayRemove(producto), {merge:true});
            return carrito
        } catch (err){
            throw new Error(`Error al eliminar producto del carrito: ${err}`)
        }
    }
}

export default CarritosDaoFirebase