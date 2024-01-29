const homeController = require("../app/http/controllers/homeController")

const home = require("../app/http/controllers/homeController")
const auth = require("../app/http/controllers/authController")
const cart = require("../app/http/controllers/customer/cartController")
const explore = require("../app/http/controllers/exploreController")
const order = require("../app/http/controllers/customer/orderController")
const admin = require("../app/http/controllers/admin/adminorderController")
const prof = require("../app/http/controllers/customer/profileController")



//Middlewares
const guestmiddleware = require("../app/http/middleware/guest")
const authmiddleware = require("../app/http/middleware/auth")
const adminmiddleware = require("../app/http/middleware/admin")



function initRoutes(app) {

    app.get("/", home().index)
    app.get("/login", auth().login)
    app.post("/login", auth().postlogin)
    app.get("/register", guestmiddleware, auth().register)
    app.post("/register", auth().postregister)
    app.post("/logout", auth().logout)

    app.get("/explore", explore().explore)
    app.get("/cart", cart().cart)
    app.post("/updatecart", cart().update)
    app.post("/removecart", cart().remove)


    app.get("/customer/orders", authmiddleware, order().index)
    app.post("/orders", authmiddleware, order().store)

    app.get("/admin/orders", adminmiddleware, admin().index)

    app.get("/admin/addshoes", admin().allshoes)
    app.post("/admin/addshoes", admin().postshoe)

    app.get("/admin/deleteshoes", admin().deleteshoes)
    app.post("/admin/deleteshoes", admin().deleteshoe)

    app.get("/profile", prof().profile)
    // app.post("/profile", auth().changepassword)

}
module.exports = initRoutes