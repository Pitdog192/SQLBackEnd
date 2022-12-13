import { createRequire } from 'module';
import args from '../../yargs.js';
const require = createRequire(import.meta.url);
const Router = require('router') ;
const routerProcess = Router();

routerProcess.get('/', (req, res) => {
    const data = {
        'Argumentos de Entrada': args,
        'Nombre de la plataforma "Sistema Operativo"': process.platform,
        'Versión de Node.js': process.version,
        'Memoria total reservada "rss"': process.memoryUsage(),
        'Path de ejecución': process.execPath,
        'Process ID': process.pid,
        'Carpeta del Proyecto': process.cwd()
    }
    return res.json(data)
})

export default routerProcess