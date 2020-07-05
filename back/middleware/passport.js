const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const User = require("../models/User")
const passport = require("passport")
const SECRET = process.env.SECRET
// check if users header request contains the token
// add jwt token and secret key to opts object
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET

module.exports = passport => {
    passport.use(
        // pass opts object to JwtStrategy
        // jwt_payload in callback which consits of id & username
           new JwtStrategy(opts, (jwt_payload, done) => {
               // try to find user with matching id in db
            User.findOne({ _id: jwt_payload.id })
            .then(user => {
                if (user) {
                    // return no error & user object
                    return done(null, user)
                } else {
                    // or false if user wasn't found
                    return done(null, false)
                }
            })
            .catch(err => 
                console.log({ error: "Error authenticating the user."}))
        })
    )
}