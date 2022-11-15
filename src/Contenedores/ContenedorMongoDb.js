import { model } from 'mongoose';

class Container {
	constructor(collection, schema) {
		this.model = model(collection, schema);
	}
	//Save an object
	async save(obj) {
		try {
			let creacion = this.model.create(obj);
			return creacion
		} catch (err) {
			console.log(err);
		}
	}
	//Get an object by ID
	async getById(id) {
		try {
			return this.model.findById(id);
		} catch (err) {
			console.log(err);
		}
	}
	//Get all objects
	async getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}

	// Update product by id
	async updateProduct(id, data) {
		try {
			return this.model.findByIdAndUpdate(id, data);
		} catch (error) {
			console.log(error);
		}
	}
	//Delete one object
	async deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

export default Container;