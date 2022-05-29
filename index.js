const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./controllers/auth");
const shippingRoute = require("./controllers/Shipping.Address");
const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/upgrad-project")
    .then(() => {
        console.log("DB Connect")

    }).catch((err) => {
        console.log(err)
    });
app.use(express.json())

app.use("/", authRoute);
app.use(shippingRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log("backend is running! " + PORT)
})