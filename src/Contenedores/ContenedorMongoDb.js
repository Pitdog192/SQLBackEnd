import mongoose from 'mongoose';

class Container {
	constructor(collection, schema) {
		this.collection = mongoose.model(collection, schema);
	}
	
	async save(obj) {
		try {
			return this.collection.create(obj);
		} catch (err) {
			console.log(err);
		}
	}

	async getById(id) {
		try {
			return this.collection.findById(id);
		} catch (err) {
			console.log(err);
		}
	}

	async getAll() {
		try {
			return this.collection.find();
		} catch (err) {
			console.log(err);
		}
	}

	async deleteById(id) {
		try {
			return this.collection.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

export default Container