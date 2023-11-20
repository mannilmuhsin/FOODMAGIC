const chef_rout = require('express').Router()
const chef_countroller=require('../controllers/chef_controller')

chef_rout.post('/addcourse',chef_countroller.addcourse)

module.exports = chef_rout