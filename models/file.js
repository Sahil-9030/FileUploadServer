const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});


// poet middleware

fileSchema.post("save", async function(doc){// doc----> data that is saved in database -- basically database entry
    try{
        console.log("doc---->",doc);
        // transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
            },
        });

        // send mail
        let info = await transporter.sendMail({
            from: `sahil gupta`,
            to: doc.email,
            subject:"New file uploaded to cloudinary",
            html:`<h2>hello user</h2> <p>the file is successfully uploaded view here -> <a href= "${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        });
      
        console.log("info--->",info);
    }
    catch(err){
        console.error(err);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
