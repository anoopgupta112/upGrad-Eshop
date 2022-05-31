const jwt = require("jsonwebtoken");
const User = require("../models/User");




const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) res.status(403).json("token is not valid")
            req.user = user;

            next();
        })
    }
    else {
        return res.status(401).json("Please Login first to access this endpoint!")
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, async () => {
        const user_data = await User.findById(req.user.id)


        if (req.user.id || user_data.role === "Admin" || user_data.isAdmin) {
            next()
        }
        else {
            res.status(403).json("you are not allowed to update")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, async () => {

        const user_data = await User.findById(req.user.id)

        if (user_data.role === "Admin" || user_data.isAdmin) {

            next()

        }
        else {
            res.status(403).json("you are not allowed to update")
        }

    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };