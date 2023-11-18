const express=require('express');
const publicrouter=express.Router()
const usercontroller=require('../controllers/user_controller')
const chefcontroller=require('../controllers/chef_controller')


publicrouter.get('/',(req,res)=>{
    try {
        res.send('hia mami')
    } catch (error) {
        console.log(error.message);
    }
})
publicrouter.post('/user/verifyotp',usercontroller.userVerifyOTP)
publicrouter.post('/user/signup',usercontroller.usersignup)
publicrouter.post('/user/login',usercontroller.userlogin)




module.exports=publicrouter