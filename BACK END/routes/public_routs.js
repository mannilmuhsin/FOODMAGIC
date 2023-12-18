const express=require('express');
const publicrouter=express.Router()
const usercontroller=require('../controllers/user_controller')
const chefcontroller=require('../controllers/chef_controller')
const pulict_controller=require('../controllers/public_controllers')


publicrouter.get('/',(req,res)=>{
    try {
        res.send('hia mami')
    } catch (error) {
        console.log(error.message);
    }
})

publicrouter.get('/getcourseById',pulict_controller.getCourseById)
publicrouter.get('/getcommunityById/:id',pulict_controller.getCommunityById)
publicrouter.get('/courses',pulict_controller.getFullCourses)
publicrouter.get('/communitys',pulict_controller.getFullCommunitys)
publicrouter.get('/successpayment',usercontroller.handleSuccessPayment)


publicrouter.post('/user/verifyotp',usercontroller.userVerifyOTP)
publicrouter.post('/user/signup',usercontroller.usersignup)
publicrouter.post('/user/login',usercontroller.userlogin)




module.exports=publicrouter