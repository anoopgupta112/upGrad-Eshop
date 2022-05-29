const mongoose = require("mongoose")
const UserScema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String, required: true, unique: true
    },
    contactnum: {
        type: Number
    },
    password: {
        type: String, required: true
    },
    role: {
        type: String,
        default: "user"
    },
}, { timestamps: true })
module.exports = mongoose.model("User", UserScema)