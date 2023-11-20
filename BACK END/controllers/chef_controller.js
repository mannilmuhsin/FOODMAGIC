const public_controler = require('../controllers/public_controllers')


const addcourse = async(req,res)=>{
    try {
        console.log(req.files);
       const uploadResult= await public_controler.uploadVideo(req.files.demoVideo)
       
        // console.log(req.body);
        console.log(uploadResult);
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    addcourse
};
