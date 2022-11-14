import admin from 'firebase-admin';
import serviceAccount from '../../DB/backend-3238a-firebase-adminsdk-frd5l-9f33279d39.json' assert { type: "json" };

admin.initializeApp( {credential: admin.credential.cert(serviceAccount)});
const db = admin.firestore();

class Container {
	constructor(coleccion) {
		this.collection = db.collection(coleccion)
	}
	//Save an object
	async save(obj) {
		try {
			const guardar = this.collection.add(obj);
			return guardar;
		} catch (err) {
			throw new Error(`Error al guardar: ${err}`);
		}
	}
	//Get an object by ID
	async getById(id) {
		try {
			const producto = await this.collection.doc(`/products/${id}`).get();
			return producto;
		} catch (err) {
			throw new Error(`Error al obtener por id: ${err}`);
		}
	}
	//Get all objects
	async getAll() {
		try {
			const productos = await this.collection.get();
			return productos;
		} catch (err) {
			throw new Error(`Error al obtener todos: ${err}`);
		}
	}

	async acualizar(nuevo){
		try{
			const actualizado = await this.collection.doc(nuevo.id).set(nuevo)
			return actualizado
		}
		catch{
			throw new Error(`Error al actualizar: ${error}`)
		}
	}
	//Delete one object
	async deleteById(id) {
		try {
			const borrado = await this.collection.doc(id).delete();
			return borrado;
		} catch (err) {
			throw new Error(`Error al borrar: ${err}`);
		}
	}
}

export default Container;