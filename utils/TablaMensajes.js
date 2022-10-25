import optionsSqlite from './SQLite3Connection.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const knex = require('knex')(optionsSqlite);

knex.schema.createTable('mensajes', table => {
    table.increments('id'),
    table.string('email'),
    table.string('fecha'),
    table.string('texto')
})
    .then(() => console.log("Tabla Creada"))
    .catch((err) => console.log("Error en crear la tabla:", err))
    .finally(() => knex.destroy());