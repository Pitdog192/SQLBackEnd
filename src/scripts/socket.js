import {mensajesDao} from '../daos/index.js';
import { normalize, schema } from 'normalizr';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const util = require('util');

const print = (objeto) => {
    console.log(util.inspect(objeto,false,12,true))
}

const author = new schema.Entity('author', {} ,{ idAttribute: 'email'});
const messages = new schema.Entity('messages');
const myArray = new schema.Array(
  {
    messages: messages,
    author: author
  }
);

async function guardarMensaje(mensaje) {
    return await mensajesDao.save(mensaje)
}

async function enviarMensaje(){
    let mensajes = await mensajesDao.getAll();
    let mensajesJson = JSON.stringify(mensajes)
    const messageData = [];
    mensajes.forEach((mensaje) => {
        messageData.push( {
            ...mensaje,
            id: mensaje.author.email,
        }
        );
    });
    const normalizeMensaje = normalize(mensajes, myArray)

    
    print(normalizeMensaje)
    console.log(messageData)
    console.log(mensajesJson.length)
    console.log(mensajesJson)
    console.log("jalow")
    return mensajes
}

const socketIo = (io) => {
    io.on('connection', socket => {
        console.log('Usuario conectado');

        enviarMensaje().then(mensajes => { //CUANDO ALGUIEN SE CONECTE TENGO QUE MANDARLE MENSAJES NORMALIZADOS
            socket.emit('mensajes', mensajes);
        })
        socket.on('nuevoMensaje', mensaje =>{
            (async () => guardarMensaje(mensaje))()  //CUANDO RECIBO UN MENSAJE LO GUARDO EN LA BASE DE DATOS Y LO VUELVO A ENVIAR NORMALIZADO
                io.sockets.emit('mensajes', mensaje);
            
        })
    })
}

export default socketIo