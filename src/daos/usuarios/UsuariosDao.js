import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const {model, Schema} = require('mongoose')

const UsuarioSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
})


export default model('Usuario', UsuarioSchema)
