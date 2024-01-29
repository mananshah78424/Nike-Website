const passport = require("passport")
const User = require("../../models/user")
function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === "admin" ? "/admin/orders" : "/customer/orders"
    }
    return {

        // Get login page
        login(req, res) {
            res.render("auth/login")
        },

        // Post on the login page   
        postlogin(req, res, next) {

            // Done function is defined here
            passport.authenticate('local', (err, user, info) => {
                if (err) {

                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect("/login")
                }
                req.logIn(user, (err) => {
                    if (err) {

                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))

                })
            })(req, res, next)
        },

        // Get the register page
        register(req, res) {
            res.render("auth/register")
        },

        //Post to the register page
        async postregister(req, res) {
            const { name, email, password } = req.body

            //Validate Request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)

                return res.redirect("/register")
            }

            //Check if email exists
            User.exists({ email: email }, (err, result) => {
                //If result is true, that means email exists in database
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect("/register")


                }
            })
            //Create a user
            const user = new User({
                name: name,
                email: email,
                password: password
            })
            user.save().then((user) => {
                //Login 
                return res.redirect("/")


            }).catch(err => {
                req.flash('error', 'Something went wrong')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect("/register")

            })

        },

        //Logout
        logout(req, res) {
            req.logout()
            return res.redirect("/")
        }
        ,
        changepassword(req, res) {
            const { password, name } = req.body;
            console.log(password, name);
            console.log(User);

            User.exists({ name: name }, (err, result) => {
                //If result is true, that means email exists in database
                if (result) {
                    User.updateOne({ name: name }, { $set: { password: password } })


                }
            })



        }


    }
}
module.exports = authController