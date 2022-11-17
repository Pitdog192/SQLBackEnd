const tabla = document.getElementById('tabla-productos');

const getProductos = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => data.forEach(element => {
        element.map((producto) => {
            tabla.innerHTML= `<tr><td>${producto.products.name}</td></tr>`
        })
    }))
    .catch((error) => console.log(error))
}

getProductos('http://localhost:8080/productos/api/productos-test')
