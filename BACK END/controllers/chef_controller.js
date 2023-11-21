const { json } = require('express');
const public_controller = require('../controllers/public_controllers');
const course_schema = require('../schemas/course_schema');


const addcourse = async (req, res) => {
    try {
      const {
        title,
        category,
        description,
        price,
        aboutChef,
      } = JSON.parse(req.body.formdata);
    const {user} = JSON.parse(req.body.user);
  
      const uploadVideoResult = await public_controller.uploadVideo(
        req.files.demoVideo
      );
      const uploadImageResult = await public_controller.uploadimage(
          req.files.coverImage
          );
  
      const newCourse = new course_schema({
        title,
        category,
        description,
        coverImage: uploadImageResult,
        demoVideo: uploadVideoResult,
        price,
        aboutChef,
        chef:user,
        chapters: [],
      });
  
      const savedCourse = await newCourse.save();
  
      res.status(201).json({message:'Course uploaded successfully !'})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };



module.exports = {
    addcourse
};
