const router = require("express").Router();
require('dotenv').config();
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const shippingAdress = require("../models/shippingAdress");
const User = require("../models/User");


router.post("/shippings/:id", verifyTokenAndAuthorization, async (req, res) => {



    const newShipping = new shippingAdress
        ({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            street: req.body.street,
            landmark: req.body.landmark,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            user: await User.findById(req.params.id)

        })


    try {


        const savedShipping = await newShipping.save()

        res.status(201).json(savedShipping)

    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router;