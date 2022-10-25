import options from "./MariaDBConnection.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id'),
    table.string('nombre'),
    table.decimal('precio'),
    table.string('foto'),
    table.string('fecha'),
    table.string('descripcion'),
    table.integer('stock'),
    table.integer('codigo')
})
    .then(() => console.log("Tabla Creada"))
    .catch((err) => console.log("Error en crear la tabla:", err))
    .finally(() => knex.destroy());