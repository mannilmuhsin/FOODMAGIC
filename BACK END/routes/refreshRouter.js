const refershRouter=require('express').Router()
const refreshTokenController=require('../controllers/refreshToeknController')


refershRouter.get('/',refreshTokenController.handlerefreshtoken)

module.exports=refershRouter