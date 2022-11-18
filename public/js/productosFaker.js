const tabla = document.getElementById('tabla-productos');

const getProductos = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => data.map((prod) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
        <tr>
            <td>${prod.product.name}</td>
            <td>${prod.product.description}</td>
            <td>$${prod.product.price}</td>
            <td>${prod.product.stock}</td>
            <td>${prod.product.pic}</td>
        </tr>`;
        tabla.appendChild(fila)
    }))
    .catch((error) => console.log(error))
}

getProductos('http://localhost:8080/productos/api/productos-test')