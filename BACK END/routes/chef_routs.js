const chef_rout = require('express').Router()
const chef_countroller=require('../controllers/chef_controller')

chef_rout.get('/addcourse',chef_countroller.getChefCourses)
chef_rout.get('/getcourse',chef_countroller.getCourse)
chef_rout.get('/getpayments',chef_countroller.getChefPayments)

chef_rout.post('/addcourse',chef_countroller.addcourse)
chef_rout.post('/addchapter',chef_countroller.addchapter)

chef_rout.put('/handleshowcourse',chef_countroller.handleshowcourse)
chef_rout.put('/deletechapter',chef_countroller.deleteChapter)

chef_rout.delete('/deletecourse/:id',chef_countroller.deleteCourses)

module.exports = chef_rout