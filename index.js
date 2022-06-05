const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./controllers/auth");
const shippingRoute = require("./controllers/Shipping.Address");
const productRoute = require("./controllers/Product");
const cors = require('cors');
const orderRoute = require("./controllers/Order");
const app = express();
const PORT = 8000;

mongoose.connect("mongodb://localhost:27017/upgrad-project")
    .then(() => {
        console.log("DB Connect")

    }).catch((err) => {
        console.log(err)
    });

//cors

app.use(
    cors({
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    })
);

app.use(express.json())

app.use("/", authRoute);
app.use(shippingRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log("backend is running! " + PORT)
})