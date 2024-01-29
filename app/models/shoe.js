const mongoose = require("mongoose")
const Schema = mongoose.Schema

const shoesSchema = new Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    size: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    desc: { type: String, required: true },
    lace: { type: String, required: true }
})

module.exports = mongoose.model('Shoes', shoesSchema)