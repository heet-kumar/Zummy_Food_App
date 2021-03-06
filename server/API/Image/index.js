// Libraries
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

// Database Model
import {ImageModel} from "../../database/allModels";

const Router = express.Router();

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({storage});

// AWS S3 Bucket
import {s3Upload} from "../../Utils/AWS/s3";

/*
Route               /
Description         Uploaging given image to S3 bucket, and then saving the file to the mongoDB
Access              Public
Parameter           None
Method              POST
*/
Router.post("/", upload.single("file") ,async(req,res)=>{
    try{
        const file = req.file;
        
        // S3 bucket options
        const bucketOptions = {
            Bucket: "bucket-name",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });

    } catch(error){
        return res.status(500).json({error: error.message});
    }
}); 


export default Router;