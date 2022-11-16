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
			const producto = await this.collection.doc(id).get();
			return producto.data();
		} catch (err) {
			throw new Error(`Error al obtener por id: ${err}`);
		}
	}
	//Get all objects
	async getAll() {
		try {
			let productosSnapshot =  await this.collection.get()
			let productos = productosSnapshot.docs;
			const listaProductos = productos.map(prod => ({
				id: prod.id,
				name: prod.data().name,
				description: prod.data().description,
				pic: prod.data().pic,
				price: prod.data().price,
				stock: prod.data().stock,
				code: prod.data().code
			}))
			return listaProductos;
		} catch (err) {
			throw new Error(`Error al obtener todos: ${err}`);
		}
	}

	async updateProduct(id,data){
		try{
			let doc = this.collection.doc(id);
			let productoActualizado = await doc.update(data)
			return productoActualizado;
		}
		catch(error){
			throw new Error(`Error al actualizar: ${error}`)
		}
	}
	//Delete one object
	async deleteById(id) {
		try {
			const doc = this.collection.doc(id)
			let productoEliminado = await doc.delete()
			return productoEliminado;
		} catch (err) {
			throw new Error(`Error al borrar: ${err}`);
		}
	}
}

export default Container;