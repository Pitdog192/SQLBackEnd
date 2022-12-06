import mongoose from 'mongoose';
import Container from '../../Contenedores/ContenedorMongoDb.js';

class UsuariosDao extends Container {
	constructor() {
		super('usuarios',new mongoose.Schema(
			{	
				username: {type: String, require: true},
				email: { type: String, require: true },
				password: { type: String, require: true },
			}
		));
	}
}

export default UsuariosDao;