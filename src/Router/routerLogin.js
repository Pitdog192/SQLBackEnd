import { createRequire } from 'module';
import Usuario from '../daos/usuarios/UsuariosDao.js';
import passport from '../scripts/passport.js';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');
const Router = require('router') ;
const routerLogin = Router();
const user = {};
//LOGIN ----------------------------------
routerLogin.get('/login', (req,res) =>{res.render('./login/login.ejs')})
routerLogin.post('/login', passport.authenticate('login', {failureRedirect: '/errorlogin', successRedirect: '/'}))
routerLogin.get('/errorlogin', (req, res) => {res.render('./login/login-error.ejs')})
routerLogin.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
routerLogin.get('/register', (req, res) => {res.render('./login/register.ejs')})
routerLogin.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body
        if(!password || !email) {
            throw Error("Error al registrar usuario")
        }

        //encriptar password
        const salt = await bcrypt.genSalt(10);
        const passEncripted = await bcrypt.hash(password, salt)
        const usuario = new Usuario({
            username: email,
            password: passEncripted 
        })
        await usuario.save()
        res.redirect('/login')    
    } catch (error) {
        console.log(error)
        res.redirect('/errorregister')
    }
})
routerLogin.get('/errorregister', (req, res) => {
    res.render('./login/register-error.ejs')
})
//FIN LOGIN--------------------------------

export default routerLogin;