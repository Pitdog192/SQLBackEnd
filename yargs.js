import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.alias({
        p: 'port'
    })
    .default({
        port: 8080
    })
    .argv

export default args
