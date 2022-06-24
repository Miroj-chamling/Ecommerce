const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbhandler')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((errors, category) => {
        if (errors || !category) {
            return res.status(400).json({
                error: errorHandler(errors)
            });
        }
        req.category = category;
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((errors, data) => {
        if (errors) {
            return res.status(400).json({
                error: errorHandler(errors)
            });
        }
        res.json({
            data
        });
    })
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })

}

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((error) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            message: `${category.name} category deleted successfully`
        })
    })
}

exports.list = (req, res) => {
    Category.find().exec((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })
}