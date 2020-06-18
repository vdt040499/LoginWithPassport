var GooglePlusStrategy = require('passport-google-oauth2').Strategy;

const User  = require('../models/users.model');

module.exports = (passport) => {
    passport.use(new GooglePlusStrategy({
        clientID: "974946233658-shibjmdfev2sgec6klqg9jss3mjm5jg0.apps.googleusercontent.com",
        clientSecret: "fBct9ppCQwURjyZ9G5-4wYez",
        callbackURL: 'http://localhost:3000/auth/gg/cb'
      },
      (token, refreshToken, profile, done) => {

        console.log(profile);

        User.findOne({ggid: profile._json.sub})
        .then((existingUser) => {
            if (existingUser) {
            done(null, existingUser);
            } else {
            var name = profile._json.family_name + ' ' + profile._json.given_name;
            new User({
                ggid: profile._json.sub,
                email: profile._json.email,
                name: name,
                username: name.replace(/\s+/g, '-').toLowerCase(),
                image: profile._json.picture
            })
                .save()
                .then(user => done(null, user));
            }
        });
      }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
    passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
    });
}
