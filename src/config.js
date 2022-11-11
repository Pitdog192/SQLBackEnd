import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv').config();

export default {
    port: process.env.PORT,
    type: process.env.PERS,
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    mongodb: {
        url : 'mongodb+srv://Pitdog:qhXz8TPoJ0epg6v7@cluster0.xmoxfot.mongodb.net/?retryWrites=true&w=majority'
    },
    firebase: {
        apiKey: "AIzaSyCHF8LEiwMrvcmcV5WZ3jdiYzksoPzEl9g",
        authDomain: "backend-3238a.firebaseapp.com",
        projectId: "backend-3238a",
        storageBucket: "backend-3238a.appspot.com",
        messagingSenderId: "57510066240",
        appId: "1:57510066240:web:92686dba794ead4d7e47a5",
        measurementId: "G-R0FDXQLEPS"
    }
}