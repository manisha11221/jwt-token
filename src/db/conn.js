const mongoose =  require('mongoose');

mongoose.set('debug',true);

mongoose.connect("mongodb://localhost:27017/Demo_manisha",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.log("Connection error:",err)
});
