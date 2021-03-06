// exposes the request and authenticated user in all views
exports.view =  (req, res, next) => {
    res.locals.auth_user = req.user;
    res.locals.request = req;
    
    next();
}