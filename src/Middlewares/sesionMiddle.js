const checkAuth = (req, res, next) => {
    if(req.session.passport.user && req.isAuthenticated()){
        return next()
    } else {
        return res.redirect('/login')
    }
}

export default checkAuth;