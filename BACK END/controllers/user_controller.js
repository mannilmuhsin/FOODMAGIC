const user_schema = require("../schemas/user_schema");
const public_controlls = require("../controllers/public_controllers");
const stripe = require("stripe")(
  "sk_test_51OISQWSBQLVhDmRfvicXDGw4m7LT3mOeF3DvnEufBcDN6v0z1STvNhlj4IkBgPHE8lDyByVzsPsv6Y8LAjVub57C00d6Xd8CEy"
);
const jwt = require("jsonwebtoken");
const course_schema = require("../schemas/course_schema");
const payment_shema = require("../schemas/payment_shema");
const blog_schema = require("../schemas/blog_schema");
const community_schema = require("../schemas/community_schema");

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
        res.status(400).json({ message: "Confirmpassword not matching.!. 😥" });
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
      console.log(1);
      if (password === user.password) {
        console.log(2);
        if (user.isVerify == true) {
          console.log(3);
          if (user.isAccess == true) {
            console.log(4);
            const accesstoken = jwt.sign(
              { username: user.username },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            const refreshtoken = jwt.sign(
              { username: user.username },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "2d" }
            );
            await user_schema.updateOne(
              { _id: user._id },
              { $set: { JWT: refreshtoken } }
            );
            res.cookie("jwt", refreshtoken, {
              httpOnly: true,
              maxAge: 48 * 60 * 60 * 1000,
            });
            // console.log(req.cookies);
            res.status(201).json({
              message: "success",
              accesstoken,
              role: user.role,
              user: user.username,
              id: user._id,
            });
          } else {
            res.status(400).json({ message: "You are Blocked 🙄" });
          }
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
    console.log(id)
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
      // console.log("not valid");
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

const updateimage = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const proimage = req.files.proimage;
    const user = JSON.parse(req.body.user);
    
    const userdata = await user_schema.findOne({ username: user.user });
    // console.log("user",userdata);

    if(userdata.pic){
      await public_controlls.deleteFromCloud(userdata.pic.public_id);
    }
    const uploadResult = await public_controlls.uploadimage(proimage);
    if (uploadResult) {
      await user_schema.updateOne(
        { username: user.user },
        { $set: { pic: uploadResult } }
      );
      // console.log(uploadResult);
      res.status(200).json({ message: "Image updated successfully" });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const handlePayment = async (req, res) => {
  try {
    const { user, video } = req.body;
    // console.log(video);
    const course = await course_schema.findOne({ _id: video._id });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              images: [course.coverImage.url],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `https://foodmagic.mannilmuhsin.shop/successpayment?session_id={CHECKOUT_SESSION_ID}&course_id=${video._id}&user_name=${user.user}`,
      cancel_url: "https://foodmagic.vercel.app/allcourses",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleSuccessPayment = async (req, res) => {
  try {
    const { session_id, user_name, course_id } = req.query;

    console.log("dksajfl",session_id);

    const userdata = await user_schema.findOne({ username: user_name });
    const course = await course_schema.findOne({ _id: course_id });
    await course_schema.findByIdAndUpdate(course_id, {
      $addToSet: { users: userdata._id },
    });

    await community_schema.updateOne(
      { course_id: course_id },
      { $addToSet: { users: userdata._id } }
    );

    const payment = new payment_shema({
      strip_id: session_id,
      course_id: course._id,
      chef_id: course.chef,
      amount: course.price,
      user_id: userdata._id,
    });

    await payment.save();
    res.redirect("https://foodmagic.vercel.app/user/mylearnigs");
  } catch (error) {
    console.log(error.message);
  }
};

const getmylearnings = async (req, res) => {
  try {
    const { username } = req.query;

    const user = await user_schema.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_id = user._id;

    const courses = await course_schema.find({ users: { $in: [user_id] } });
    // console.log(courses);

    return res.json({ courses: courses });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    // console.log('hello');
    const blogs = await blog_schema.find();
    res.json({ blogs });
  } catch (error) {
    console.log(error.message);
  }
};

const addReview = async(req,res)=>{
  try {
    const {rating, review, user, course_id} = req.body
    const savedChapter = await course_schema.updateOne(
        { _id: course_id },
        { $push: { reviews: {
          rating,
          review,
          user,
          date:new Date()
        } } }
      );
    // console.log(req.body);
    res.status(200).json({message:'review added successfully'})
  } catch (error) {
    console.log(error.message);
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
  updateimage,
  handlePayment,
  handleSuccessPayment,
  getmylearnings,
  getAllBlogs,
  addReview
};
