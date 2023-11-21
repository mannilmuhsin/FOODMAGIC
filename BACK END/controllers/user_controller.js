const user_schema = require("../schemas/user_schema");
const public_controlls = require("../controllers/public_controllers");
const jwt = require("jsonwebtoken");

const usersignup = async (req, res) => {
  try {
    const { username, email, phone, password, confirmpassword, isChef } =
      req.body;
    const user = await user_schema.findOne({ username: username });
    if (user) {
      res.status(400).json({ message: "This user name already existed." });
    } else {
      const { otp, secret } = await public_controlls.genarateOTP();
      if (password === confirmpassword) {
        const newuser = new user_schema({
          username: username,
          email: email,
          phone: phone,
          password: password,
          OTP: secret,
          role: isChef ? 3000 : 2000,
        });
        await newuser.save();
        res.cookie("id", newuser._id, { maxAge: 500000, httpOnly: true });
        public_controlls.sendemailotp(email, otp);
        res.status(201).json({ message: "enter your otp" });
      } else {
        res.status(400).json({ message: "Confirmpassword not matching.!." });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userlogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log("on login");
    const user = await user_schema.findOne({ username: username });
    if (user) {
      if (password === user.password) {
        if (user.isVerify == true) {
          const accesstoken = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
          );
          const refreshtoken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          await user_schema.updateOne(
            { _id: user._id },
            { $set: { JWT: refreshtoken } }
          );
          res.cookie("jwt", refreshtoken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          // console.log(req.cookies);
          res.status(201).json({
            message: "success",
            accesstoken,
            role: user.role,
            user: user.username,
          });
        } else {
          res.status(400).json({ message: "You are not verifyed" });
        }
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else {
      res.status(400).json({ message: "User not exist...!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { user } = req.body;
    // console.log(user);
    const userdetailes = await user_schema.findOne({ username: user });
    // console.log(userdetailes);
    if (userdetailes) {
      res.status(200).json({ userdetailes });
    } else {
      res.status(401).json({ message: "User not fond !" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userVerifyOTP = async (req, res) => {
  try {
    const { OTP } = req.body;
    const id = req.cookies.id;
    // console.log(id)
    let user = await user_schema.findOne({ _id: id });
    const secret = user.OTP;
    const isValid = public_controlls.verifyOTP(secret, OTP);
    if (isValid == true) {
      console.log(isValid);
      const role = user.role;

      await user_schema.updateOne({ _id: id }, { $set: { isVerify: true } });

      res.clearCookie("id");

      res.status(200).json({ message: role });
    } else {
      console.log("not valid");
      res.status(400).json({ message: "OTP not valid." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verifypassword = async (req, res) => {
  try {
    const {
      user: { user },
      values: { oldpassword },
    } = req.body;
    const userdata = await user_schema.findOne({ username: user });
    if (userdata.password === oldpassword) {
      res.status(200).json({ message: "ok" });
    } else {
      res.json({ message: "Password is not matching ." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const {
      user: { user },
      values: { newpassword },
      values: { conformpassword },
    } = req.body;
    if (newpassword == conformpassword) {
      const userdata = await user_schema.updateOne(
        { username: user },
        { $set: { password: newpassword } }
      );
      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.json({ message: "conform password not matching ." });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const updateprofile = async (req, res) => {
  try {
    const {
      values: { username, phone },
      user: { user: user },
    } = req.body;
    const usredata = await user_schema.findOne({ username: username });
    if (!usredata) {
      await user_schema.updateOne(
        { username: user },
        { $set: { username: username, phone: phone } }
      );
    } else {
      res.json({ message: "This user name alredy existed !", error: true });
    }
    const userdetailes = await user_schema.findOne({ username: username });
    const accesstoken = jwt.sign(
      { username: userdetailes.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10s" }
    );
    const refreshtoken = jwt.sign(
      { username: userdetailes.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    await user_schema.updateOne(
      { _id: userdetailes._id },
      { $set: { JWT: refreshtoken } }
    );
    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Profile updated Successfully",
      user: userdetailes.username,
      token: accesstoken,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateimage=async (req,res)=>{
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const proimage = req.files.proimage; 
    const user = JSON.parse(req.body.user);

    const userdata=await user_schema.findOne({username:user.user})

    await public_controlls.deleteFromCloud(userdata.pic.public_id)
    const uploadResult= await public_controlls.uploadimage(proimage)
    if(uploadResult){
      await user_schema.updateOne({username:user.user},{$set:{pic:uploadResult}})
      console.log(uploadResult);
      res.status(200).json({ message: 'Image updated successfully' });
    }
    
    
  } catch (error) {
    console.error(error.message);
  }
}   

module.exports = {
  usersignup,
  userlogin,
  getUserProfile,
  userVerifyOTP,
  verifypassword,
  changePassword,
  updateprofile,
  updateimage
};
