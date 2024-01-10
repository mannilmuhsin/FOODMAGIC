require("dotenv").config({ path: `../.env` });
const { Worker } = require("bullmq");
const mongoose = require("mongoose");
const user_schema = require("../schemas/user_schema");
const course_schema = require("../schemas/course_schema");
const public_controller = require("../controllers/public_controllers");
const community_schema = require("../schemas/community_schema");

// console.log(process.env.DATABASE_URL);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connection to MongoDB: ", err);
  });

const workerHandler = async (job) => {
  switch (job.data.type) {
    case "VideoUpload": {
      try {
        console.log("VideoUpload");
        // console.log({ ...job.data });

        const {
          title,
          category,
          description,
          price,
          aboutChef,
          blurb,
          user,
          demoVideo,
          coverImage,
        } = job.data.data;

        const uploadVideoResult = await public_controller.uploadVideo(
          demoVideo
        );
        const uploadImageResult = await public_controller.uploadimage(
          coverImage
        );

        const userdata = await user_schema.findOne({ username: user });

        const newCourse = new course_schema({
          title,
          category,
          description,
          coverImage: uploadImageResult,
          demoVideo: uploadVideoResult,
          price,
          blurb,
          aboutChef,
          chef: userdata._id,
          chapters: [],
        });

        const savedCourse = await newCourse.save();

        const newGroup = new community_schema({
          course_id: newCourse._id,
          title: title,
          proImage: uploadImageResult.url,
          users: [userdata._id],
        });

        await newGroup.save();

        console.log("succeess VideoUpload");
        return;
      } catch (error) {
        console.log(error);
      }
    }
    case "uploadChapter": {
      try {
        console.log("uploadChapter");
        console.log({ ...job.data });

        const { chapterNo, title, description, demoVideo, coverImage ,id} =
          job.data.data;

        const uploadVideoResult = await public_controller.uploadVideo(
          demoVideo
        );
        const uploadImageResult = await public_controller.uploadimage(
          coverImage
        );

        const newChapter = {
          id: chapterNo,
          title,
          description,
          coverImage: uploadImageResult,
          demoVideo: uploadVideoResult,
        };

        // console.log(newCourse);
        const savedChapter = await course_schema.updateOne(
          { _id: id },
          { $push: { chapters: newChapter } }
        );

        console.log("succeess uploadChapter");
        return;
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const workerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

const worker = new Worker("testQueue", workerHandler, workerOptions);

console.log("worker Started");
