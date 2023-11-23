const { json } = require('express');
const public_controller = require('../controllers/public_controllers');
const course_schema = require('../schemas/course_schema');
const user_schema = require('../schemas/user_schema');


const addcourse = async (req, res) => {
    try {
      const {
        title,
        category,
        description,
        price,
        aboutChef,
        blurb
      } = JSON.parse(req.body.formdata);
    const {user} = JSON.parse(req.body.user);
  
      const uploadVideoResult = await public_controller.uploadVideo(
        req.files.demoVideo
      );
      const uploadImageResult = await public_controller.uploadimage(
          req.files.coverImage
          );

          const userdata=await user_schema.findOne({username:user})
  
      const newCourse = new course_schema({
        title,
        category,
        description,
        coverImage: uploadImageResult,
        demoVideo: uploadVideoResult,
        price,
        blurb,
        aboutChef,
        chef:userdata._id,
        chapters: [],
      });
  
      const savedCourse = await newCourse.save();
  
      res.status(201).json({message:'Course uploaded successfully !'})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  };

  const getChefCourses=async (req,res)=>{
    try {
      const { user } = req.query;
      const userData= await user_schema.findOne({username:user})
      const courses=await course_schema.find({chef:userData._id})
      if(courses){
        res.status(201).json({courses})
      }else{
        res.status(400).json({message:'Courses is empty 😥'})
      }
      // console.log(courses);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const getCourse=async (req,res)=>{
    try {
      const { id } = req.query;
      const course=await course_schema.findOne({_id:id})
      if(course){
        res.status(201).json({course})
      }else{
        res.status(400).json({message:'Courses is empty 😥'})
      }
      // console.log(courses);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleshowcourse=async (req,res)=>{
    try {
        const {id}=req.body
        const course = await course_schema.findOne({_id: id });
        await course_schema.updateOne({_id: course._id }, { $set: { isShow:!course.isShow } })
        

        res.status(200).json({message:'show changed success fully'})
    } catch (error) {
        console.log(error.message);
    }
}

const deleteCourses = async (req, res) => {
  try {
    const result = await course_schema.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addchapter=async(req,res)=>{
  try {
    const {
      title,
      description,
    } = JSON.parse(req.body.formdata);
  const {id} = req.body;
  // console.log(req.body);
  // console.log(req.body.formdata);
  // console.log(req.files);

    const uploadVideoResult = await public_controller.uploadVideo(
      req.files.demoVideo
    );
    const uploadImageResult = await public_controller.uploadimage(
        req.files.coverImage
        );

        const newChapter ={
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

    res.status(201).json({message:'Chapter uploaded successfully !'})
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}



module.exports = {
    addcourse,
    getChefCourses,
    getCourse,
    handleshowcourse,
    deleteCourses,
    addchapter
};
