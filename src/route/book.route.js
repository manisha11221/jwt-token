const route = require('express').Router();
const verifyToken = require('../middleware/bookAuth.middle')

const{
    registerBook,
    loginBook,
    viewData

} = require('../controller/book.ctrl')

route.post('/register', registerBook);
route.post('/login', loginBook);
route.get('/view',auth,viewData);

module.exports = route;