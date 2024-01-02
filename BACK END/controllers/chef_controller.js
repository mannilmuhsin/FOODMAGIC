require("dotenv").config();
const { Queue } = require("bullmq");

const { json } = require("express");
const public_controller = require("../controllers/public_controllers");
const course_schema = require("../schemas/course_schema");
const user_schema = require("../schemas/user_schema");
const { v4: uuidv4 } = require("uuid");
const payment_shema = require("../schemas/payment_shema");
const community_schema = require("../schemas/community_schema");
const blog_schema = require("../schemas/blog_schema");
// const { ZIMKitManager } = require('@zegocloud/zimkit-react');

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};

// queue setup
const queues = {
  testQueue: new Queue("testQueue", {
    connection: redisOptions,
  }),
};

// utilities
const addJobToTestQueue = (job) => queues.testQueue.add(job.type, job);

const addcourse = async (req, res) => {
  try {
    const { title, category, description, price, aboutChef, blurb } =
      JSON.parse(req.body.formdata);
    const { user } = JSON.parse(req.body.user);

    addJobToTestQueue({
      type: "VideoUpload",
      data: {
        user,
        title,
        category,
        description,
        price,
        aboutChef,
        blurb,
        demoVideo: req.files.demoVideo,
        coverImage: req.files.coverImage,
      },
    });

    console.log("dslfasldjf");

    // const uploadVideoResult = await public_controller.uploadVideo(
    //   req.files.demoVideo
    // );
    // const uploadImageResult = await public_controller.uploadimage(
    //   req.files.coverImage
    // );

    // const userdata = await user_schema.findOne({ username: user });

    // const newCourse = new course_schema({
    //   title,
    //   category,
    //   description,
    //   coverImage: uploadImageResult,
    //   demoVideo: uploadVideoResult,
    //   price,
    //   blurb,
    //   aboutChef,
    //   chef: userdata._id,
    //   chapters: [],
    // });

    // const savedCourse = await newCourse.save();

    // const newGroup = new community_schema({
    //   title: title,
    //   proImage: uploadImageResult.url,
    //   users: [userdata._id],
    // });

    // await newGroup.save();

    console.log("queued");
    res.status(200).json({ message: "Queued" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getChefCourses = async (req, res) => {
  try {
    const { user } = req.query;
    const userData = await user_schema.findOne({ username: user });
    const courses = await course_schema.find({ chef: userData._id });
    if (courses) {
      res.status(201).json({ courses });
    } else {
      res.status(400).json({ message: "Courses is empty 😥" });
    }
    // console.log(courses);
  } catch (error) {
    console.log(error.message);
  }
};

const getCourse = async (req, res) => {
  try {
    const { id } = req.query;
    const course = await course_schema.findOne({ _id: id });
    if (course) {
      res.status(201).json({ course });
    } else {
      res.status(400).json({ message: "Courses is empty 😥" });
    }
    // console.log(courses);
  } catch (error) {
    console.log(error.message);
  }
};

const handleshowcourse = async (req, res) => {
  try {
    const { id } = req.body;
    const course = await course_schema.findOne({ _id: id });
    await course_schema.updateOne(
      { _id: course._id },
      { $set: { isShow: !course.isShow } }
    );

    res.status(200).json({ message: "show changed success fully" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCourses = async (req, res) => {
  try {
    const result = await course_schema.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteChapter = async (req, res) => {
  try {
    const { id, index } = req.body;

    const course = await course_schema.findOne({ _id: id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const result = await course_schema.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          chapters: { id: index },
        },
      },
      { new: true }
    );

    if (result) {
      res.status(200).json({ message: "Chapter deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addchapter = async (req, res) => {
  try {
    const { chapterNo, title, description } = JSON.parse(req.body.formdata);
    const { demoVideo, coverImage } = req.files;

    const { id } = req.body;

    const duplicate = await course_schema.findOne({
      _id: id,
      chapters: { $elemMatch: { id: chapterNo } },
    });

    if (duplicate) {
      res.status(500).json({ message: "Chapter is allredy existed !" });
    } else {
      addJobToTestQueue({
        type: "uploadChapter",
        data: {
          chapterNo,
          title,
          description,
          demoVideo,
          coverImage,
          id
        },
      });

      // const uploadVideoResult = await public_controller.uploadVideo(
      //   req.files.demoVideo
      // );
      // const uploadImageResult = await public_controller.uploadimage(
      //   req.files.coverImage
      // );

      // const newChapter = {
      //   id: chapterNo,
      //   title,
      //   description,
      //   coverImage: uploadImageResult,
      //   demoVideo: uploadVideoResult,
      // };

      // // console.log(newCourse);
      // const savedChapter = await course_schema.updateOne(
      //   { _id: id },
      //   { $push: { chapters: newChapter } }
      // );

      res.status(201).json({ message: "Chapter uploaded successfully !" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const addBlog = async (req, res) => {
  try {
    const { heading, description, creator ,content } = JSON.parse(req.body.formdata);
    const { image } = req.files;
    
    const uploadImageResult = await public_controller.uploadimage(image);
    
    const newBlog = new blog_schema({
      user: creator,
      description,
      title: heading,
      image: uploadImageResult,
      content
    });
    console.log(newBlog);

    await newBlog.save();

    res.status(201).json({ message: "blog created successfully !" });
    // console.log(req.body.image);
    // console.log(image);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getChefPayments = async (req, res) => {
  try {
    const { chef_id } = req.query;
    const chef = await user_schema.findOne({ username: chef_id });
    const payments = await payment_shema
      .find({ chef_id: chef._id, isDivided: true })
      .populate("user_id")
      .populate("chef_id")
      .populate("course_id");

    res.json({ payments });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  addcourse,
  getChefCourses,
  getCourse,
  handleshowcourse,
  deleteCourses,
  addchapter,
  deleteChapter,
  getChefPayments,
  addBlog,
};
