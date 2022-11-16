import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';
import ProductosDaoMongoDb from "../productos/ProductosDaoFirebase.js";

let productos = new ProductosDaoMongoDb();

class CarritosDaoMongoDb extends Container {

	constructor() {
		super('carritos',new mongoose.Schema(
			{
				productos: { type: Array, require: false },
			}
		));
	}
	async guardarCarrito(carrito = {productos: []}){
        try{
			return super.save(carrito)
		}catch(err){
			throw new Error(`Error al crear carrito: ${err}`)
		}
    }
	async updateProduct(id, data) {
		try {
			return this.model.findByIdAndUpdate(id, data);
		} catch (error) {
			throw new Error(`Error al actualizar producto: ${err}`)
		}
	}
	async getProducts(id) {
		return this.model.findById(id).find({ products: {} });
	}
	async insertProducto(idCarrito, idProducto) {
		try{
			const carrito = await this.model.updateOne({_id: idCarrito }, { $push: { productos: idProducto } });
        return carrito;
		}catch(err){
			throw new Error(`Error al insertar productos en el carrito: ${err}`)
		}
	}
	async deleteProduct(idCarrito, idProducto) {
		try{
			const cart = await this.model.findById(idCarrito);
			const index = await cart.productos.findIndex(el => el._id == idProducto);
			await cart.productos.splice(index, 1);
			return await cart.save();
		} catch(err){
			throw new Error(`Error al eliminar producto del carrito: ${err}`)
		}
	}
}

export default CarritosDaoMongoDb;