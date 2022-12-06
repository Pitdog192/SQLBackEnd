import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';

class UsuariosDao extends Container {
	constructor() {
		super('usuarios',new mongoose.Schema(
			{
				email: { type: String, require: true },
				password: { type: String, require: true },
			}
		));
	}
	getUser(email) {
		try {
			return this.model.findOne({email: email});
		} catch (error) {
			console.log(error);
		}
	}
}

export default UsuariosDao;