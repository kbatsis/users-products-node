const logger = require("../logger/logger");
const Product = require("../models/product.model");

exports.findAll = async(req, res) => {
    console.log("Find all products.")

    try {
        const result = await Product.find();
        res.status(200).json({data: result});
        logger.info("Success in reading all products.");
    } catch (err) {
        logger.error(`Problem in reading products: ${err}`);
    }
}

exports.findOne = async(req, res) => {
    console.log("Find one product.");

    const product = req.params.product;
    try {
        const result = await Product.findOne({product: product});
        res.status(200).json({data: result});
        logger.info("Success in reading product.")
    } catch (err) {
        logger.error(`Problem in reading product: ${err}`);
    }
}

exports.create = async(req, res) => {
    console.log("Create a product");

    const newProduct = new Product({
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    });

    try {
        const result = await newProduct.save();
        res.status(200).json({data: result});
        logger.info("Product saved.")
    } catch (err) {
        res.status(400).json({data: err});
        logger.error("Problem in saving product.");
    }
}

exports.update = async(req, res) => {
    const productName = req.params.product;
    console.log("Update product: ", productName);

    const updateProduct = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity
    };

    try {
        const result = await Product.findOneAndUpdate(
            {product: productName},
            updateProduct,
            {new: true}
        );
        res.status(200).json({data: result});
        logger.info("Success in updating product: ", productName);
    } catch (err) {
        res.status(400).json({data: err});
        logger.error(`Problem in updating product: ${productName}`);
    }
}

exports.delete = async(req, res) => {
    const productName = req.params.product;
    console.log("Delete product", productName);

    try {
        const result = await Product.findOneAndDelete({product: productName});
        res.status(200).json({data: result});
        logger.info("Success in deleting product: ", productName)
    } catch (err) {
        res.status(400).json({data: err});
        logger.error("Problem in deleting product: ", productName);
    }
}