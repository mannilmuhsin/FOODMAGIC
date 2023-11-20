const nodemailer = require("nodemailer");
const otplib = require("otplib");
const crypto = require('crypto');
const cloudinary = require("cloudinary").v2;
// const AWS = require('aws-sdk');
// const { v4: uuidv4 } = require('uuid');

// import { authenticator } from '@otplib/preset-v11';
// const authenticator=otplib.authenticator

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

cloudinary.config({
  cloud_name: "dswtrdxzw",
  api_key: "928468198542362",
  api_secret: "YKxn9-7Mu2olsWKdfDF54IJJC2U",
});


const uploadimage = async (onefile) => {
  try {
    const result = await cloudinary.uploader.upload(onefile.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "image",
      folder: "FOODMAGIC",
      transformation: [
        {
          width: 300,
          height: 420,
          crop: "fill_pad",
          gravity: "auto",
          quality: 100,
        },
      ],
    });
    let image = {
      url: result.url,
      public_id: result.public_id,
    };
    return image;
  } catch (error) {
    console.log(error.message);
  }
};

const uploadVideo = async (videoFile) => {
  try {
    const result = await cloudinary.uploader.upload(videoFile.tempFilePath, {
      resource_type: "video",
      public_id: `${Date.now()}`,
      folder: "VIDEO_FOLDER_FOODMAGIC",
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
        { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" }
      ],
      eager_async: true,
      eager_notification_url: "https://mysite.example.com/notify_endpoint",
      max_file_size: 100000000 // Set to the maximum size you want to allow
    });

    
    let video = {
      url: result.url,
      public_id: result.public_id,
    };

    return video;
  } catch (error) {
    console.log(error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};


const deleteFromCloud=async (publicId)=>{
  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error.message);
  }
}


const genarateOTP = async () => {
  try {
    const otps = Math.floor(1000 + Math.random() * 9000);
    const otp=otps.toString();
    const secret=crypto.createHash('sha256').update(otp).digest('hex');

    return {otp,secret}
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOTP=(secret,otp)=>{
    try {
        const userotp=crypto.createHash('sha256').update(otp).digest('hex');
        
        return userotp==secret
    } catch (error) {
        console.log(error.message);
    }
}

const sendemailotp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "marakadians@gmail.com",
        pass: "mnfpzaetsetikufj",
      },
    });

    const mailoptions = {
      from: "mannilmuhsin3@gmail.com",
      to: email,
      subject: "for verification mail",
      html: "<p>your otp is " + otp + "</p>",
    };

    transporter.sendMail(mailoptions, (error, data) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("Email has been sent ", data.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  sendemailotp,
  genarateOTP,
  verifyOTP,
  uploadimage,
  deleteFromCloud,
  uploadVideo
};
