const { remove } = require("../../../models/user")

function cartController() {
    return {
        cart(req, res) {
            res.render("cart")
        },
        update(req, res) {

            // Demo of how the cart will look 
            // let cart={
            //     items:{
            //         shoeid:{item:shoeObject,qty:0},
            //     },
            //     totalQty:0,
            //     totalPrice:0,
            // }

            //For the first time creating cart and adding basic structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            }
            let cart = req.session.cart


            //Check if item does not exist in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })

        },

        remove(req, res) {
            let cart = req.session.cart
            shoe = req.body
            _id = shoe.item._id
            qty = shoe.qty
            cart.items[shoe.item._id].qty = cart.items[shoe.item._id].qty - 1

            if (cart.items[shoe.item._id].qty == 0) {

                delete cart.items[shoe.item._id]
            }

            cart.totalQty = cart.totalQty - 1
            cart.totalPrice = cart.totalPrice - shoe.item.price
            return res.json({ totalQty: req.session.cart.totalQty })

        }
    }
}
module.exports = cartController