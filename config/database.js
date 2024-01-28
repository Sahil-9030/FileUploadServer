const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB connection successfull "))
    .catch((err)=>{
        console.log("Issue in DB connection")
        console.log(err);
        process.exit(1);
    });
}