import { createRequire } from 'module';
import args from '../../yargs.js';
const require = createRequire(import.meta.url);
const Router = require('router') ;
const routerProcess = Router();

routerProcess.get('/', (req, res) => {
    const data = {
        'argumentos': args,
        'plataforma': process.platform,
        'version de Node': process.version,
        'memoria': process.memoryUsage(),
        'ruta de ejecucion': process.execPath,
        'process ID': process.pid,
    }
    return res.json(data)
})

export default routerProcess