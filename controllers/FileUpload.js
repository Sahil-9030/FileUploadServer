const { truncateSync } = require("fs");
const File = require("../models/file");
const cloudinary = require("cloudinary");

exports.localFileUpload = async(req,res) => {
    try{
        // fetch the file
        const file = req.files.file;
        console.log("files---> ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;// __diename indicates the current directory --> controllers/FileUpload
        console.log("path ---> ", path);

        file.mv(path, (err) => { // mv-->move function
            console.log(err)
        });

        res.json({
            success:true,
            message:" Local File uploaded successfully"
        });
    }
    catch(err){
        console.log(err);
    }
}

function isFileTypeSupported(fileType,supportedFileTypes){
    return supportedFileTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.v2.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req,res) => {
    try{ 

        const {name,email,tags} = req.body; 
        console.log(name, email, tags );
 
        // fetch the file 
        const file = req.files.imageFile;
        console.log("file-->", file);

        const supportedFileTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filetype -->",fileType);

        if(!isFileTypeSupported(fileType,supportedFileTypes)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        // if file type supported
        const response = await uploadFileToCloudinary(file, "old");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log("filedata---->",fileData);
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


exports.videoUpload = async(req,res) => {
    try{

        const {name,email,tags} = req.body; 
        console.log(name, email, tags );

        // fetch the file 
        const file = req.files.videoFile;
        console.log("file-->", file);

        const supportedFileTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filetype -->",fileType);

        if(!isFileTypeSupported(fileType,supportedFileTypes)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        // if file type supported
        const response = await uploadFileToCloudinary(file, "old");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log("filedata---->",fileData);
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video uploaded successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.reducedImageUpload = async(req,res) => {
    try{ 

        const {name,email,tags} = req.body; 
        console.log(name, email, tags );

        // fetch the file 
        const file = req.files.imageFile;
        console.log("file-->", file);

        const supportedFileTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("filetype -->",fileType);

        if(!isFileTypeSupported(fileType,supportedFileTypes)){
            return res.status(400).json({
                success:false,
                message:"File type is not supported"
            });
        }

        // if file type supported
        const response = await uploadFileToCloudinary(file, "old",70);
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        console.log("filedata---->",fileData);
        
        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image uploaded successfully"
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

