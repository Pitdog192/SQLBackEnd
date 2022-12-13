import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Router = require('router') ;
const routerRandom = Router();
const {fork} = require('child_process');
const path = require('path');

routerRandom.get('/random', (req, res) => {
    const forked = fork(path.join('random.js')) 
    let num = 100000000
    if(req.query.numrand){
        num = req.query.numrand
    }
    forked.send(num)
    forked.on('message', (respuesta) => {
        res.send(respuesta)
    })
})

export default routerRandom;