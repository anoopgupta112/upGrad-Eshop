const mongoose = require("mongoose")
const ProductSaveScema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    category: {
        type: String,
        default: "",
        required: true
    },
    price: { type: Number, required: true },
    description: { type: String },
    manufacturer: { type: String },
    availableItems: { type: Number },
    imageUrl: { type: String }


}, { timestamps: true })
module.exports = mongoose.model("product", ProductSaveScema)