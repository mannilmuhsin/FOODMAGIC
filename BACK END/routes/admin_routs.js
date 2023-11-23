const admin_rout = require('express').Router()
const adminController = require('../controllers/adminController')

admin_rout.get('/getusers',adminController.getUsers)


admin_rout.put('/handleaccess',adminController.handleaccess)

module.exports = admin_rout