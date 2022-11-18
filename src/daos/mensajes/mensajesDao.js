import Container from "../../Contenedores/ContenedorMongoDb.js";
import mongoose from 'mongoose';

class MensajesDao extends Container{
    constructor(){
        super('mensajes', new mongoose.Schema({
        author:{
            id: {type: String, require: true},
            name: {type:String, require: true},
            lastName: {type:String, require: true},
            age: {type: Number, require: true},
            alias: {type:String, require: true},
            avatar: {type:String, require: true},
        },
        text: {type:String, require: true},
    }))
    }

}

export default MensajesDao