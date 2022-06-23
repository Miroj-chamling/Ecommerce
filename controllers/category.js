const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbhandler')

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((errors, data)=>{
        if(errors){
            return res.status(400).json({
                error: errorHandler(errors)
            });
        }
        res.json({
            data
        });
    })
}