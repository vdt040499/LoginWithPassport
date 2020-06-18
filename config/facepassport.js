const facebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/users.model');

module.exports = (passport) => {
    
    passport.use(new facebookStrategy({
        // clientID: "356521828649755",
        // clientSecret: "9c0b4d5192f2eb1a5f22978f7f639c1a",
        // callbackURL: "http://localhost:3000/auth/fb/cb"
        clientID: "284819299328472",
        clientSecret: "a57fb8321f7d78e06bca7905dc9166a7",
        callbackURL: "http://localhost:3000/auth/fb/cb"
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({fbid: profile._json.id}, (err, user) => {
          if(err) {
            return done(err);
          } else {
            if(user) {
              return done(null, user);
            } else {
              const user = new User ({
                fbid: profile._json.id,
                name: profile._json.name,
                username: profile._json.name.replace(/\s+/g, '-').toLowerCase()
              });

              user.save((err) => {
                return done(null, user);
              });
            }
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
