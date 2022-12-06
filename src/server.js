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
import passport from 'passport';
import {usuariosDao} from './daos/index.js';
mongoose.set('strictQuery', false);
const require = createRequire(import.meta.url);
const { Server: IOServer} = require('socket.io');
const { Server: HttpServer}  = require('http');
const app = express();
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
passport.use('login', new LocalStrategy(
    (username,password,done) => {
        usuariosDao.findOne({username}, (err, user) => {
            if(err){
                return done(err)
            }
            if(!user){
                console.log(`El usuario: ${user} no existe`)
                return done(null, false)
            }
            if(!passValid(password)){
                console.log('Contraseña invalida')
                return done(null, false)
            }
            return done(null,user)
        })
}))

//LOCAL STRATEGY SIGUP
passport.use('signup', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, 
    (req, username, password, done) => {
        usuariosDao.findOne({ 'username': username }, function (err, user) {
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            } 
            if (user) {
                console.log('User already exists');
                return done(null, false)
            } 
            const newUser = {
                username: username,
                email: req.body.email,
                password: createHash(password),
            }
            usuariosDao.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user)
                console.log('User Registration succesful');
                return done(null, userWithId);
            });
    });
}))

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function(user,done){
    done(null, user.username)
})

passport.deserializeUser(function(username,done){
    const usuario = usuariosDao.getById(username)
    done(null, usuario)
})


//LOGIN ----------------------------------
app.get('/login', (req,res) =>{res.render('./login/login.ejs')})
app.post('/login', passport.authenticate('login', {failureRedirect: '/errorlogin', successRedirect: '/productos'}))
app.get('/errorlogin', (req, res) => {res.render('./login/login-error.ejs')})
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
app.get('/register', (req, res) => {res.render('./login/register.ejs')})
app.post('/register', passport.authenticate('signup', {failureRedirect: '/errorregister', successRedirect: '/login'}))
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