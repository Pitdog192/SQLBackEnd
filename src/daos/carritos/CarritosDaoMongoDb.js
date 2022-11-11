import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';

class CarritosDaoMongoDb extends Container {
	constructor() {
		super('carritos', new mongoose.Schema(
			{
				productos: { type: Array, require: true },
			},
			{ timestamps: true }
		));
	}
	updateProduct(id, data) {
		try {
			return this.model.findByIdAndUpdate(id, data);
		} catch (error) {
			console.log(error);
		}
	}
}

export default CarritosDaoMongoDb;