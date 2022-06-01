const { verifyToken } = require("../middleware/verifyToken");
const order = require("../models/order");
const productModel = require("../models/productModel");
const productSave = require("../models/productSave");
const shippingAdress = require("../models/shippingAdress");
const User = require("../models/User");
const router = require("express").Router();

//there are some error in this js file I'll fix it soon
router.post("/", verifyToken, async (req, res) => {

    const user_data = await User.findById(req.user.id);
    const p_data = await productSave.find(req.body._id);

    const address_data = await shippingAdress.find(req.body._id);

    const UserOrder = await order.findOne(address_data.map(m => {
        if (m._id == req.body.address) {
            console.log("first")
        }
        else {
            console.log("not got it")
        }
    }))



    try {


        // const userOrder = await UserOrder

        res.status(201).json(UserOrder)

    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router;