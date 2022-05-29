const mongoose = require("mongoose")
const AddressScema = new mongoose.Schema({
    AccessToken: {
        type: String
    },

    name: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    street: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    landmark: { type: String },
    zipCode: { type: String, required: true },
    user: { type: Array }

}, { timestamps: true })
module.exports = mongoose.model("Addresses", AddressScema)