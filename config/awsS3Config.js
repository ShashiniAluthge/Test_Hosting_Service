require('dotenv').config();
const S3=require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName=process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId=process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY;

const s3=new S3({
    region,
    accessKeyId,
    secretAccessKey
}) 
//image upload function
const uploadFile = async(file)=>{
    const fileStream = fs.createReadStream(file.path)
    const uploadParams ={
        Bucket:bucketName,
        Body:fileStream,
        Key:file.filename,
        ContentType: file.mimetype || 'application/octet-stream'
    }
     try{
        const data= await s3.upload(uploadParams).promise();
        return data;
     }catch(error){
        console.log(error);
     }    
}


module.exports = uploadFile;
