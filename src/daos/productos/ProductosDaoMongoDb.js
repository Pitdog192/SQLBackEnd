import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';

class ProductosDaoMongoDb extends Container {
	constructor() {
		super('productos',new mongoose.Schema(
			{
				name: { type: String, require: true },
				description: { type: String, require: true },
				code: { type: Number, require: true, unique: true },
				pic: { type: String, require: true },
				price: { type: Number, require: true },
				stock: { type: Number, require: true }
			}
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

export default ProductosDaoMongoDb;