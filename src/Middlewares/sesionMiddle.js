let admin = true;
const sesionMiddleware = (req, res, next) => {
    if(admin){
        next()
    } else {
        res.json({respuesta: "no tiene permisos"})
    }
}

export default sesionMiddleware;