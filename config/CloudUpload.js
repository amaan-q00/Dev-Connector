const cloudinary = require("cloudinary").v2;
require('./cloudConfig')
let CloudUpload=async (image) =>{
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, (err, resUrl)=> {
        if (err) return reject(err);
        return resolve(resUrl)
      });

    })
  }
  module.exports={
    CloudUpload
  }