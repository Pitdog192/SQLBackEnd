const socket = io.connect();
function renderMensajes(mensajes){
    let html = mensajes.map((mensaje) => {
        return(
            `<tr>
                <td> ${mensaje.author.avatar}</td>
                <td> ${mensaje.author.id}</td>
                <td> ${mensaje.author.name}</td>
                <td> ${mensaje.author.lastName}</td>
                <td> ${mensaje.author.age}</td>
                <td> ${mensaje.author.alias}</td>
                <td> ${mensaje.text}</td>
            </tr>`
        );
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

function dosDecimales(n) {
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
}

const porcentajeCompresion = (norm, desnorm) => {
    let mensajesNormalizados = JSON.stringify(norm).length;
    let mensajesDesnormalizados = JSON.stringify(desnorm).length;
    const botonPorcentaje = document.getElementById('btn-compresion');
    let porcentaje = (mensajesNormalizados * 100) / mensajesDesnormalizados;
    botonPorcentaje.innerHTML = `Total de compresión de mensajes: ${dosDecimales(porcentaje)}%`;
    return porcentaje
}

socket.on('mensajes', mensaje => {
    const author = new normalizr.schema.Entity('author', {} ,{ idAttribute: 'id'});
    const mensajeSchema = new normalizr.schema.Array({
        author: author
    });
    const mensajeDesnormalize = normalizr.denormalize(mensaje.result, mensajeSchema, mensaje.entities);
    porcentajeCompresion(mensaje.result, mensajeDesnormalize)
    renderMensajes(mensajeDesnormalize);
})

const enviarMensaje = () => {
    let mensajeNuevo = {
        author: {
            id: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastName: document.getElementById('lastName').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('text').value
    };
    socket.emit('nuevoMensaje', mensajeNuevo);
    document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';  
    document.getElementById('age').value = '';  
    document.getElementById('alias').value = '';  
    document.getElementById('avatar').value = '';  
    document.getElementById('text').value = '';   
    return false;
}

socket.on('productos', producto => {
    renderProductos(producto);
});

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

let nombreLogin = document.getElementById('nombreLogin')
let formLogin = document.getElementById('formLogin')
let cartelBien = document.getElementById('cartelBien')
let bienvenida = cartelBien.firstElementChild

const submitLogin = () => {
    let datos = {
        nombre: nombreLogin.value
    }
    nombreLogin.value = '';
    fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({
            nombre: datos.nombre
        }),
        headers: {
            'Content-type' : "application/json; charset= UTF-8"
        }
    })
    .then(resp => resp.json())
    .then(json => {
        formLogin.classList.remove('show')
        formLogin.classList.add('hide')
        cartelBien.classList.add('show', 'cartelBien')
        bienvenida.innerHTML = `Bienvenido ${json.nombreLogin}`
    })
    .catch(err => console.log(err))
    return false
}

const hastaLuego = () => {
    setTimeout(() => {
        formLogin.classList.remove('hide')
        formLogin.classList.add('show')
        cartelBien.classList.remove('show', 'cartelBien')
        cartelBien.classList.add('hide')
    }, 3000);
}

const logout = () => {
    fetch('http://localhost:8080/logout')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        bienvenida.innerHTML = `Hasta luego ${data.user}`
        hastaLuego()
    })
    return false
}
