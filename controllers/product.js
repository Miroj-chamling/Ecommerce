const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const {errorHandler} = require('../helpers/dbhandler')

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (error, fields, files)=>{
        if(error){
            return res.status(400).json({
                error: 'Image not uploaded!'
            })
        }
        let product = new Product(fields)
        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.filepath)
            product.photo.contentType = files.photo.type
        }

        product.save((error, result)=>{
            if(error){
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(result);
        })
    })
}