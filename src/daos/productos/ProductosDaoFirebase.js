import Container from "../../Contenedores/ContenedorFirestore.js";

class ProductosDaoFirebase extends Container{
    constructor(){
        super('productos')
    }
}

export default ProductosDaoFirebase