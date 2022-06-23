const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema
const { uuid } = require('uuidv4');


const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true,
    },
},{
    timestamps: true,
});



module.exports = mongoose.model("Category", categorySchema);