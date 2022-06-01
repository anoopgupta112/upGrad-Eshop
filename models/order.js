const mongoose = require("mongoose")
const OrderSaveScema = new mongoose.Schema({
    address: {
        type: Object,
        required: true
    },
    product: {
        type: Object,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    user: { type: Object, required: true }



}, { timestamps: true })
module.exports = mongoose.model("Orders", OrderSaveScema)