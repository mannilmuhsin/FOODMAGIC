const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const { exec } = require("child_process");
const util = require("util");
const execPromise = util.promisify(exec);
const fs = require("fs");
const course_schema = require("../schemas/course_schema");
const community_schema = require("../schemas/community_schema");

const ffmpegPath = "C:\\ProgramData\\chocolatey\\bin\\ffmpeg.exe";

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
    const outputDirectory = "./compressed_videos";
    const compressedVideoPath = `${outputDirectory}/${Date.now()}_compressed.mp4`;

    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    const ffmpegCommand = `"${ffmpegPath}" -i "${videoFile.tempFilePath}" -c:v libx265 -preset medium -crf 32 -c:a aac -strict -2 "${compressedVideoPath}"`;
    await execPromise(ffmpegCommand);

    const result = await cloudinary.uploader.upload(compressedVideoPath, {
      resource_type: "video",
      public_id: `${Date.now()}`,
      folder: "VIDEO_FOLDER_FOODMAGIC",
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
      eager_notification_url: "https://mysite.example.com/notify_endpoint",
      max_file_size: 100000000,
    });

    fs.unlinkSync(compressedVideoPath);

    let video = {
      url: result.url,
      public_id: result.public_id,
    };

    return video;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const deleteFromCloud = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error.message);
  }
};

const genarateOTP = async () => {
  try {
    const otps = Math.floor(1000 + Math.random() * 9000);
    const otp = otps.toString();
    const secret = crypto.createHash("sha256").update(otp).digest("hex");

    return { otp, secret };
  } catch (error) {
    console.log(error.message);
  }
};

const verifyOTP = (secret, otp) => {
  try {
    const userotp = crypto.createHash("sha256").update(otp).digest("hex");

    return userotp == secret;
  } catch (error) {
    console.log(error.message);
  }
};

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

const getFullCourses = async (req, res) => {
  try {
    const courses = await course_schema.find({ isShow: true });
    if (courses) {
      res.status(201).json({ courses });
    }
  } catch (error) {
    console.log(error.message);
  }
};


const getFullCommunitys = async (req, res) => {
  try {
    const communitys = await community_schema.find();
    if (communitys) {
      res.status(201).json({ communitys });
    }
  } catch (error) {
    console.log(error.message);
  }
};


const getCourseById = async (req, res) => {
  try {
    const { id } = req.query;
    const course = await course_schema.findOne({ _id: id });
    if (course) {
      res.status(201).json({ course });
    } else {
      res.status(400).json({ message: "Courses is empty 😥" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getCommunityById = async(req,res)=>{
  try {
    const {id} = req.params

    const community = await community_schema.findById(id)
    // console.log(community);
    // console.log('hello');
    if (community) {
      res.status(201).json({ community });
    } else {
      res.status(400).json({ message: "community is empty 😥" });
    }

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  sendemailotp,
  genarateOTP,
  verifyOTP,
  uploadimage,
  deleteFromCloud,
  uploadVideo,
  getFullCourses,
  getCourseById,
  getFullCommunitys,
  getCommunityById
};
