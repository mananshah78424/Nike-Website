const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:{
        type:Object,
        required:true,
    },
    address:{type:String,required:true},
    PaymentType:{type:String,default:'COD'},
    status:{type:String,default:"Order placed"}
},{timestamps:true})

module.exports=mongoose.model('Order',orderSchema)