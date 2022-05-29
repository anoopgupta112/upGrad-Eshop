const router = require("express").Router();
const User = require("../models/User")
require('dotenv').config();
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken");

router.post("/users", async (req, res) => {
    const newUser = new User({

        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SECURITY).toString(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contactnum: req.body.contactnum,


    })

    try {

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)

    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

//login
router.post("/auth", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("wrong email")


        const hashedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SECURITY
        );


        const Original_password = hashedPassword.toString(CryptoJs.enc.Utf8);
        Original_password != req.body.password &&
            res.status(401).json(Original_password)

        const accessToken = jwt.sign({
            id: user._id
        }, process.env.JWT_SEC,
            { expiresIn: "3d" })

        console.log(accessToken)
        const { password, ...others } = user._doc;

        const username = others.firstname + others.lastname;
        const email = others.email;
        const isAuthenticated = true;
        res.status(200).json({ email, username, isAuthenticated })


    }
    catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;