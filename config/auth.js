exports.isUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('danger', 'Vui lòng đăng nhập');
        res.redirect('/users/login');
    }
}