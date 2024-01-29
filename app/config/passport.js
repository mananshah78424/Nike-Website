const LocalStrategy = require('passport-local').Strategy

const User = require("../models/user")
function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {

        //Login
        //Check if email exists
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: "No user with this email" })
        }

        if (password == user.password) {
            console.log("Match found");
            return done(null, user, { message: 'Logged in successfully' })
        } else {
            return done(null, false, { message: "Wrong Username or Password" })
        }
    }))

    //What to store in the session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //How to get whats stored
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {

            done(err, user)
        })
    })

}

module.exports = init