const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const booksSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    pages : {
        type : String,
        required : true
    },
    code : {
        type : String,
        required : true,
    },
    tokens: {
        type : String,
    },
})

booksSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id.toString()} , 'book-token');
    return token;
};

const auth_book = mongoose.model('book', booksSchema);
  
module.exports = auth_book;