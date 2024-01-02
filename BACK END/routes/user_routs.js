const express=require('express')
const userrouter=express.Router()
const usercontroller=require('../controllers/user_controller')
// const uploadImage = require('../helper/multer.js')


userrouter.get('/mylearnings',usercontroller.getmylearnings)

// userrouter.post('/profile',usercontroller.getUserProfile)
// userrouter.post('/verifypassword',usercontroller.verifypassword)
userrouter.post('/makepayment',usercontroller.handlePayment)

// userrouter.put('/changepassword',usercontroller.changePassword)
// userrouter.put('/updateProfile',usercontroller.updateprofile)
// userrouter.put('/updateProimage',usercontroller.updateimage)


module.exports=userrouter