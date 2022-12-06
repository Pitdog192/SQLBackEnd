import  express from 'express';
import session from 'express-session';
import routerProductos from './Router/routerProductos.js';
import routerCarrito from './Router/routerCarrito.js';
import { createRequire } from 'module';
import config from './config.js';
import mongoose from 'mongoose';
import socketIo from './scripts/socket.js';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import checkAuth from './Middlewares/sesionMiddle.js';
import bCrypt from 'bcrypt'; 

const require = createRequire(import.meta.url);
const { Server: IOServer} = require('socket.io');
const { Server: HttpServer}  = require('http');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.use(cookieParser('ecommerce'))
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongodb.url,
        collectionName: 'usuarios',
        mongoOptions: advancedOptions,
        ttl: 600
    }),
    secret: 'ecommerce',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/productos', checkAuth, routerProductos); //RUTA DE PRODUCTOS
app.use('/carrito', checkAuth, routerCarrito); // RUTA DE CARRITO

//EJS
app.set('views', './views/ejs')
app.set('view engine', 'ejs');
//CONECCION A MONGODBATLAS
try {
    await mongoose.connect(config.mongodb.url);
} catch (error) {
    console.log(error)
} 

//COMPROBACIÓN DE CONTRASEÑA
const passValid = (user, password) => {
    return bCrypt.compareSync(password, user.password)
}

//HASH CONTRASEÑA
const passHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

//LOCAL STRATEGY LOGIN
passport.use('login',new LocalStrategy(function(username,password,done){
    User.findOne({username}, (err, user) => {
        if(err){
            return done(err)
        }
        if(!user){
            console.log(`El usuario: ${user} no existe`)
            return done(null, false)
        }
        if(!passValid){
            console.log('Contraseña invalida')
            return done(null, false)
        }
        return done(null,user)
    })
}))

//LOCAL STRATEGY SIGUP
passport.use('signup', new LocalStrategy({passReqToCallback: true}, (req,username,password,done) => {
    User.findOne({'username': username}, function(err,user){
        if(err){
            console.log(`Error en el registro: ${err}`)
            return done(err)
        }
        if(user){
            console.log(`El usuario ${user} ya existe`)
            return done(null,false)
        }
        const newUser = {
            username: username,
            password: passHash(password),
            email: req.body.email
        }
        user.Create(newUser, (err, userWithId) =>{
            if(err){
                console.log(`Error al guardar un usuario: ${err}`)
                return done(err)
            }
            console.log(`Creación de usuario satisfactoria`)
            return done(null, userWithId)
        })
    })
}))

//LOGIN ----------------------------------
app.get('/login', (req,res) =>{
    res.render('./login/login.ejs')
})

app.post('/login', passport.authenticate('login', {failureRedirect: '/errorlogin'}), (req, res) => {
    res.redirect('/productos')
})

app.get('/errorlogin', (req, res) => {
    res.render('./login/login-error.ejs')
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(!err){
            setTimeout(() => {
                res.redirect('/login')
            }, 2000);
        } else {
            res.json({resp: 'Logout Error', error: err})
        }
    })
})

app.get('/register', (req, res) => {
    res.render('./login/register.ejs')
})

app.post('/register', passport.authenticate('signup', {failureRedirect: '/errorregister'}), (req, res) => {
    res.redirect('/login')
})

app.get('/errorregister', (req, res) => {
    res.render('./login/register-error.ejs')
})
//FIN LOGIN--------------------------------


// SOCKETS-------------------------------
socketIo(io);
// FIN DE SOCKETS-------------------------

//RESPUESTA PARA RUTAS NO IMPLEMENTADAS
app.use('*', (req, res) => {
    let path = req.params;
    res.send({ Error_ruta: `La ruta: '${path[0]}' no está implementada` });
});
const server = httpServer.listen(config.port, () => console.log(`Server escuchando, http://localhost:${config.port}`));
server.on('error', (error) => console.log(`Error: ${error}`));