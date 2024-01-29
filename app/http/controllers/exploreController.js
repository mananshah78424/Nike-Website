const Shoe = require("../../models/shoe")

function exploreController() {
    return {
        async explore(req, res) {
            const shoes = await Shoe.find()
            return res.render('explore', { shoes: shoes })
        }
    }
}
module.exports = exploreController