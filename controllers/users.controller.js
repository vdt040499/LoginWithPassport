const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/users.model');

module.exports.signup = (req, res) => {
    var username = '';
    var email = '';
    var name = '';
    var phone = '';

    res.render('user/signup', {
        headTitle: 'Sign up',
        username: username,
        email: email,
        name: name,
        phone: phone
    });
}

module.exports.signupPost = async(req, res) => {

    try {
        var username = req.body.username;
        var email = req.body.email;
        var name = req.body.name;
        var phone = req.body.phone;
        var password = req.body.password;
        var repass = req.body.repass;

        req.checkBody('username', 'Vui lòng nhập tên đăng nhập!').notEmpty();
        req.checkBody('email', 'Vui lòng nhập email!').isEmail();
        req.checkBody('name', 'Vui lòng nhập tên!').notEmpty();
        req.checkBody('phone', 'Vui lòng nhập số điện thoại!').isMobilePhone();
        req.checkBody('password', 'Vui lòng nhập mật khẩu!').notEmpty();
        req.checkBody('repass', 'Vui lòng nhập lại mật khẩu!').equals(password);

        var errors = req.validationErrors();

        if (errors) {
            res.render('user/signup', {
                headTitle: 'Sign up',
                username: username,
                email: email,
                name: name,
                phone: phone,
                errors: errors
            })
        } else {
            const existUser = await User.findOne({username: username});

            if(existUser) {
                req.flash('danger', 'Email đã tồn tại! Xin đổi email khác');
                res.render('user/signup', {
                    headTitle: 'Sign up',
                    username: username,
                    name: name,
                    email: '',
                    phone: phone,
                });
            } else {

                const salt = await bcrypt.genSalt(10);

                const hash = await bcrypt.hash(password, salt);

                var user = new User ({
                    username: username,
                    name: name,
                    email: email,
                    phone: phone,
                    password: hash
                });

                await user.save();

                req.flash('success', 'Tạo tài khoản thành công!');
                res.redirect('/users/login');
            }
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports.login = (req, res) => {

    if(res.locals.user) res.redirect('/');

    var email = '';

    res.render('user/login', {
        headTitle: "Login", 
        email: email
    });
}

module.exports.loginPost = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true
          })(req, res, next);
    } catch(e) {
        console.log(e);
    }
}

module.exports.logout = (req, res) => {
    req.logout();

    req.flash('success', 'Bạn đã đăng xuất');
    res.redirect('/users/login');
}

module.exports.profile = async (req, res) => {
    const user = await User.findOne({username: req.params.username});

    res.render('user/profile', {
        headTitle: user.username,
        user: user
    })
}

