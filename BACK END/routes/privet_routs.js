const express=require('express')
const privet_router=express.Router()
const usercontroller=require('../controllers/user_controller')
const adminController = require('../controllers/adminController')
const chef_controller = require('../controllers/chef_controller')


// privet_router.get('/getusers',adminController.getUsers)
privet_router.get('/getpayments',adminController.getPayments)
// privet_router.get('/getcategorys',adminController.getCategorys)

privet_router.post('/profile',usercontroller.getUserProfile)
privet_router.post('/verifypassword',usercontroller.verifypassword)
privet_router.post('/addblog',chef_controller.addBlog)
privet_router.post('/addreview',usercontroller.addReview)

privet_router.put('/changepassword',usercontroller.changePassword)
privet_router.put('/updateProfile',usercontroller.updateprofile)
privet_router.put('/updateProimage',usercontroller.updateimage)


module.exports=privet_router