const Order = require("../../../models/order")
const moment = require("moment")
function orderController() {
    return {
        store(req, res) {

            //Validate Request
            const { address } = req.body
            if (!address) {
                req.flash('error', 'Enter address field please')
                return res.redirect("/cart")
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                address: address,

            })
            order.save().then(result => {
                req.flash('success', 'Succesfully placed')
                delete req.session.cart
                return res.redirect("/customer/orders")
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect("/cart")
            })
        },

        async index(req, res) {
            const orders = await Order.find(
                { customerId: req.user._id },
                null,
                { sort: { "createdAt": -1 } },

            )
            det = req.user
            res.render("orders", { orders: orders, moment: moment, user: det })

        }
    }
}
module.exports = orderController