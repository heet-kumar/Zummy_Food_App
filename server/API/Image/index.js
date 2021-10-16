// // Libraries
// import express from "express";
// import AWS from "aws-sdk";
// import multer from "multer";

// // Database Model
// import {ImageModel} from "../../database/allModels";

// const Router = express.Router();

// // Multer Config
// const storage = multer.memoryStorage();
// const upload = multer({storage});

// // AWS S3 Bucket
// const s3Bucket = new AWS.S3({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET_KEY,
//     region: "ap-south-1"
// });

// const S3Upload = (options) => {
//     return new Promise((resolve, reject)=>
//         s3Bucket.upload(options, (error,data)=> {
//             if(error) return reject(error);
//             return resolve(data);
//         })
//     );
// };

// const uploadImage = await S3Upload(bucketOptions);

// /*
// Route               /
// Description         Uploaging given image to S3 bucket, and then saving the file to the mongoDB
// Access              Public
// Parameter           None
// Method              POST
// */
// Router.post("/", async(req,res)=>{
//     try{
//         const file = req.file;
        
//         // S3 bucket options
//         const bucketOptions = {
//             Bucket: "bucket-name",
//             Key: file.originalname,
//             Body: file.buffer,
//             ContentType: file.mimetype,
//             ACL: "public-read"
//         };

//     } catch(error){
//         return res.status(500).json({error: error.message});
//     }
// }); 


// export default Router;