const admin_rout = require('express').Router()
const adminController = require('../controllers/adminController')

// admin_rout.get('/getusers',adminController.getUsers)
// admin_rout.get('/getcategorys',adminController.getCategorys)

admin_rout.post('/addcatogery',adminController.addCategory)
admin_rout.post('/changeimage',adminController.changeImage)

admin_rout.put('/handleaccess',adminController.handleaccess)
admin_rout.put('/handlePaymentOfChef',adminController.handlePaymentOfChef)

module.exports = admin_rout