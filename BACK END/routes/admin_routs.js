const admin_rout = require('express').Router()
const adminController = require('../controllers/adminController')

admin_rout.get('/getusers',adminController.getUsers)
admin_rout.get('/getpayments',adminController.getPayments)


admin_rout.put('/handleaccess',adminController.handleaccess)
admin_rout.put('/handlePaymentOfChef',adminController.handlePaymentOfChef)

module.exports = admin_rout