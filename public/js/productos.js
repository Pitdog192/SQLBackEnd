let divProductos = document.getElementById('productos');

const getProductos = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => data.productos.map((producto) => {
        let card = document.createElement('div');
        let html = 
            `<img class="card-img-top" src=${producto.foto} alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">$${producto.precio}</p>
                <a href="#" class="btn btn-primary">Agregar al carrito </a>
                </div>
                <div class="row">
                <a href="#" class="btn btn-success btnActualizar col-5" data-id="${producto.id}">Actualizar</a>
                <a href="#" class="btn btn-danger btnEliminar col-5" data-id="${producto.id}">Eliminar</a>
                </div>`;
        card.classList.add('card');
        card.innerHTML = html;
        divProductos.appendChild(card);
    }))
    .catch((error) => console.log(error))
}

getProductos('http://localhost:8080/productos');

const eliminarProducto = (id_producto) => {
    fetch(`http://localhost:8080/productos/${id_producto}`)
}