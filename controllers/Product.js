const router = require("express").Router();
const Product = require("../models/productModel");
const ProductSaveScema = require("../models/productSave");
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require("../middleware/verifyToken");

// get product by query 
router.get("/", async (req, res) => {
    const QName = req.query.name;
    const QId = req.query._id;
    const QCategory = req.query.category;

    try {
        let products;
        if (QName) {
            products = await Product.find().sort.toArray(function (err, result) {
                if (err) throw err;

                db.close();
            });
        }
        else if (QCategory) {
            products = await Product.find({
                category: {
                    $in: [QCategory],
                }
            });

        }
        else if (QId) {
            products = await Product.findById(QId)
        }
        else {
            products = await Product.find();
        }

        res.status(200).json(products)

    }
    catch (err) {
        res.status(500).json(err)
    }



})

//get product category
router.get("/categories", async (req, res) => {

    try {
        Product.find((err, docs) => {
            if (!err) {
                function myFunction(num) {
                    return num.category;
                }

                res.status(200).json(docs.map(myFunction))


            } else {
                console.log('Failed to retrieve category: ' + err);
            }
        });

    }
    catch (err) {
        res.status(500).json(err)
    }



})

// get product by id 
router.get("/:id", async (req, res) => {
    try {

        Product.findById(req.params.id, function (err, docs) {
            if (err) {
                res.status(200).json(`No Product found for ID - ${req.params.id}`)

            }
            else {
                res.status(200).json(docs)
            }
        });


    }
    catch (err) {
        res.status(500).json(err)
    }
})

// save products 
router.post("/", verifyToken || verifyTokenAndAdmin, async (req, res) => {
    const productS = new ProductSaveScema
        ({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            availableItems: req.body.availableItems,
            imageUrl: req.body.imageUrl
        })


    try {

        const savedProduct = await productS.save()

        if (verifyTokenAndAdmin) {

            res.status(201).json(savedProduct)
            console.log("savedProduct")
        }
        else {
            const val = { _id, ...savedProduct }
            res.status(201).json(val)
            console.log(val)
        }

    }
    catch (err) {
        res.status(500).json(err)
    }
});

// update products 
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {

        const updateProduct = await ProductSaveScema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(201).json(updateProduct)

    }
    catch (err) {
        res.status(500).json(err)
    }
});

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {

        Product.findByIdAndDelete(req.params.id, function (err, docs) {
            if (docs == null) {
                res.status(500).json(`No Product found for - ${req.params.id}`)
            }
            else if (err) {
                res.status(500).json(err)

            }
            else {
                res.status(200).json(docs)
            }
        });


    }
    catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router;