const socket = io.connect();

socket.on('productos', producto => {
    renderProductos(producto);
});

socket.on('mensajes', mensaje => {
    renderMensajes(mensaje);
})

function renderMensajes(mensajes){
    let html = mensajes.map((mensaje) => {
        return(
            `<tr>
                <th scope="row"> ${mensaje.id}</th>
                <td class="fontFecha"> ${mensaje.fecha}</td>
                <td class="fontEmail"> ${mensaje.email}</td>
                <td class="fontTexto">${mensaje.texto}</td>
            </tr>`
        );
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

function renderProductos(productos){
    let html = productos.map((producto) => {
        return(
            `<tr>
                <th scope="row"> ${producto.id}</th>
                <td> ${producto.nombre}</td>
                <td> $${producto.precio}</td>
                <td><img src=${producto.foto}></td>
            </tr>`
        );
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}


const enviarMensaje = () => {
    let f = new Date();
    let fecha = `${f.getDate()}/${f.getMonth()}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
    let mensajeNuevo = {
        email: document.getElementById('email').value,
        fecha: fecha,
        texto: document.getElementById('mensaje').value
    };
    socket.emit('nuevoMensaje', mensajeNuevo);
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';    
    return false;
}

const enviarProducto = () => {
    let nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        foto: document.getElementById('foto').value,
        descripcion: document.getElementById('descripcion').value,
        stock: document.getElementById('stock').value,
        codigo: document.getElementById('codigo').value
    };
    socket.emit('nuevoProducto', nuevoProducto)
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('foto').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('codigo').value = '';
    return false;
}
