const btnLogout = document.getElementById('btnLogout');
const cartelBienvenida = document.getElementById('bienvenida');
const cartelDespedida = document.getElementById('despedida');
btnLogout.addEventListener('click', () => {
    cartelBienvenida.classList.add('esconder')
    cartelDespedida.classList.remove('esconder')
})

// const eliminarProducto = (id_producto) => {
//     fetch(`http://localhost:8080/productos/${id_producto}`)
// }