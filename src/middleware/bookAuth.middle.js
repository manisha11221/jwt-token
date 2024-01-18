const authmodel = require("../model/book.model");
const jwt = require("jsonwebtoken");
const auth = require('../middleware/bookAuth.middle')

const authSchema = async(req,res,next) => {
    try {   
        const token = req.headers.authorization;
        console.log("---token",token);
        const verifyUser = jwt.verify(token,'book-token');
        const user = await authmodel.findOne({_id:verifyUser._id});
        console.log("user_data_uid",user);
        if(user == null) {
            return res.status(404).json({
                message: "you are not authorized this action",
                status: 409,
              });
        } else {
         req.token = token;
            req.user = user;
            next();
        }
    } catch (error) {
        console.log("error:::",error);
        res.status(401).send("Not Match Data");
    }
}

module.exports = authSchema;