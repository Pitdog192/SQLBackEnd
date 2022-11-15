import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';

class CarritosDaoMongoDb extends Container {
	constructor() {
		super('carritos',new mongoose.Schema(
			{
				productos: { type: Array, require: false },
			}
		));
	}
	async insertProduct(id){
		try{
			let productos = this.model.findById(id).productos;
			return productos;
		} catch(err){
			console.log(err)
		}
	}

	async updateProduct(id, data) {
		try {
			return this.model.findByIdAndUpdate(id, data);
		} catch (error) {
			console.log(error);
		}
	}
}

export default CarritosDaoMongoDb;