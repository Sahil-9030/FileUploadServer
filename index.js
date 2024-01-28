// app create 
const express = require("express");
const app = express();

// port find
require("dotenv").config();
const PORT = process.env.PORT || 3000

// middleware addition
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// db connect
const db = require("./config/database")
db.connect();

//  cloud connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect(); 

// api route mount
const Upload = require("./routes/fileupload");
app.use("/api/v1/upload",Upload);


// server activate
app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`);
});
 