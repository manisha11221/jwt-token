const auth = require('../model/book.model');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

// book_registration
exports.registerBook = async (req, res) => {
    try {
        const authdata = new auth({
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            pages: req.body.pages,
            code: req.body.code
        })
        const data = await authdata.save();
        res.status(201).json({
            message: "Registed succefully",
            status: 201,
            data: data
        })
    } catch (error) {
        console.log("++++", error);
        res.status(500).json({
            message: "Some thing went wrong",
            status: 500,
            error: error.message
        })
    }
}

//login
exports.loginBook = async (req, res) => {
    try {
      const { name, code, token } = req.body;
      const book = await auth.findOne({ name });
        
      console.log("books",book);

      if (!book) {
        return res.status(404).json({
          message: 'Data Not Exist',
          status: 404,
        });
      }
  
      if (code === book.code) {

        
        const token = (book.tokens && book.tokens[0]?.token) || (await book.generateAuthToken());

  
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 5000 * 3),
          httpOnly: true,
        });
  
        return res.status(200).json({
          message: 'LOGIN SUCCESSFULLY',
          status: 200,
          token,
        });
      } else {
        return res.status(403).json({
          message: 'PASSWORD DOES NOT MATCHED!!',
          status: 403,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'SOMETHING WENT WRONG, PLEASE TRY AGAIN',
        status: 500,
        error: error.message,
      });
    }
};


//viewby token

exports.viewData = async (req, res) => {
  try {
      const data = await auth.find({});
      res.status(200).json({
          message: "all records",
          status: 200,
          data: data
      })

  } catch (error) {
      res.status(500).json({
          message: "please try again",
          status: 500,
          error: error.message
      })
  }
}