const { populate } = require("../../../models/order")
const moment = require("moment")
const Order = require("../../../models/order")
const Shoe = require("../../../models/shoe")

function adminorderController() {
    return {
        index(req, res) {
            Order.find({ status: { $ne: 'completed' } }, null, { sort: { "createdAt": -1 } }).
                populate("customerId", "-password").exec((err, orders) => {
                    // console.log(orders);
                    res.render("admin/orders", { orders: orders, moment: moment })
                })
        },

        allshoes(req, res) {
            res.render("admin/addshoes")

        },
        postshoe(req, res) {
            console.log(req.body.gender);
            const shoe = new Shoe({
                name: req.body.name,
                size: req.body.size,
                gender: req.body.gender,
                type: req.body.type,
                price: req.body.price,
                lace: req.body.lace,
                image: req.body.image,
                desc: req.body.desc,

            })
            shoe.save();
            res.redirect("../explore")

        },
        deleteshoes(req, res) {
            res.render("admin/deleteshoes")
        },
        deleteshoe(req, res) {
            console.log("getting")
            const id = req.body._id;
            Shoe.findByIdAndDelete(id, function (err) {
                if (!err) {
                    console.log("Deleted");
                    res.redirect("../explore")

                }
            })

        }
    }
}
module.exports = adminorderController