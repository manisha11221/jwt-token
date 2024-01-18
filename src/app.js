const express = require('express');
const app  = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const db = require('./db/conn');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : false}));

const route = require('./route/book.route');

app.use("/book",route);

app.listen(5000, () => {
    console.log("The Port is running");
})


