const category_schema = require("../schemas/category_schema");
const payment_shema = require("../schemas/payment_shema");
const user_schema = require("../schemas/user_schema");
const public_controller = require("../controllers/public_controllers");

const getUsers = async (req, res) => {
  try {
    // console.log('helllllllllllllllllll');
    const studens = await user_schema.find({ role: req.query.role });
    res.json({ studens });
  } catch (error) {
    console.log(error.message);
  }
};

const handleaccess = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await user_schema.findOne({ username: name });
    await user_schema.updateOne(
      { username: name },
      { $set: { isAccess: !user.isAccess ,JWT:""} }
    );

    res.status(200).json({ message: "access changed success fully" });
  } catch (error) {
    console.log(error.message);
  }
};

const getPayments = async (req, res) => {
  try {
    // console.log('woooooooooooooooooooo');
    const payments = await payment_shema.find()
      .populate('user_id') 
      .populate('chef_id') 
      .populate('course_id');  

    res.json({ payments });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePaymentOfChef = async(req,res)=>{
  try {
    const {payment_id} = req.body
    await payment_shema.updateOne({_id:payment_id},{$set:{isDivided:true}})
    res.status(200).json({message:'Chef amount paid successfully .'})
  } catch (error) {
    console.log(error.message);
  }
}

const getCategorys = async (req,res) =>{
  try {
    // console.log('helooooooooooooooooooooooooooooo');
    const categories = await category_schema.find()
    res.json({categories})
  } catch (error) {
    console.log(error.message);
  }
}

const addCategory = async (req,res) =>{
  try {
    const {image} = req.files
    const {title} = req.body

    const upperCaseTitle = title.toUpperCase();
    const category = await category_schema.findOne({title:upperCaseTitle})

    if(category){
        return res.status(400).json({ message: 'This category already exists.' });
      }

    const uploadImageResult = await public_controller.uploadimage(image);

    const newCategory = new category_schema({
      title:upperCaseTitle,
      image:uploadImageResult
    })

    await newCategory.save()

    res.json({message:'Category added successfully .'})


  } catch (error) {
    console.log(error.message);
  }
}

const changeImage = async (req,res) =>{
  try {
    const {image} = req.files
    const {id} = req.body

    const category = await category_schema.findOne({_id:id})

    const uploadImageResult = await public_controller.uploadimage(image);
    await public_controller.deleteFromCloud(category.image.public_id)

    await category_schema.findByIdAndUpdate(id,{$set:{image:uploadImageResult}})

  

    res.json({message:'Category edited successfully .'})


  } catch (error) {
    console.log(error.message);
  }
}
module.exports = {
  getUsers,
  handleaccess,
  getPayments,
  handlePaymentOfChef,
  getCategorys,
  addCategory,
  changeImage
};
