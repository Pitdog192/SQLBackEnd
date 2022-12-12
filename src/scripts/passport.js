import { createRequire } from 'module';
import bcrypt from 'bcrypt';
import passport from 'passport';
import Usuario from '../daos/usuarios/UsuariosDao.js';
const require = createRequire(import.meta.url);
const LocalStrategy = require('passport-local').Strategy

//login
passport.use('login', new LocalStrategy( async (username, password, done) => {
    const usuario = await Usuario.findOne({ username })
    console.log(usuario)
    if(!usuario){
        return done(null, false)
    }
    const coincide = await bcrypt.compare(password, usuario.password)
    if(!coincide){
        return done(null, false)
    }
    return done(null, usuario)
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.username)
})

passport.deserializeUser(async (username, done) => {
    const usuario = await Usuario.find({username})
    done(null, usuario)
})

export default passport;