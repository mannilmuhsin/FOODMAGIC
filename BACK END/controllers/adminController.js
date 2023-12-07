const payment_shema = require("../schemas/payment_shema");
const user_schema = require("../schemas/user_schema");

const getUsers = async (req, res) => {
  try {
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


module.exports = {
  getUsers,
  handleaccess,
  getPayments,
  handlePaymentOfChef
};
