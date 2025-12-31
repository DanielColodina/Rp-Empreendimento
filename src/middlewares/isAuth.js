module.exports = function isAuth(req, res, next) {
    if(req.session && req.session.adminId) {
        return next();
    }

    return  res.redirect('/login')
}