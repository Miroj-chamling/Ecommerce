const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbhandler');
const { exec } = require('child_process');
const category = require('../models/category');

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((error, product) => {
        if (error || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({
                error: 'Image not uploaded!'
            })
        }

        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "Please fill all the required fields."
            })
        }
        let product = new Product(fields)
        if (files.photo) {
            console.log(files.photo.size);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image shaould be less than 1mb in size."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.type
        }

        product.save((error, result) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (error, fields, files) => {
        if (error) {
            return res.status(400).json({
                error: 'Image not uploaded!'
            })
        }

        const { name, description, price, category, quantity, shipping } = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "Please fill all the required fields."
            })
        }

        let product = req.product;
        product = _.extend(product, fields);
        if (files.photo) {
            console.log(files.photo.size);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image shaould be less than 1mb in size."
                })
            }
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.type
        }

        product.save((error, result) => {
            if (error) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}


exports.remove = (req, res) => {
    let product = req.product;
    product.remove((error, deletedProduct) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json({
            "message": `${req.product.name} has been successfully deleted`
        })
    })
}

/**
 * sorting by sell or arrival query
 * by sell = /allproducts?sortby=sold&order=desc&limit=4
 * by arrival = /allproducts?sortby=createdAt&order=desc&limit=4
 */

exports.list = (req, res, next) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({})
        .select('-photo')
        .populate("category").sort(
            [
                [sortBy, order]
            ]
        )
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(data);
        })
}

/**
 * finding the product on the req product category
 * other products of the same category will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products);
        })
}


exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Products not found"
            })
        }
        res.json(categories);
    })
}