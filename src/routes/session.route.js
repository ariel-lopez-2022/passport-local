const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const { REGISTER_STRATEGY, LOGIN_STRATEGY} = require('../utils/constants')
const router = Router()


router.post('/register', passport.authenticate(REGISTER_STRATEGY) , sessionController.loginRegister)
router.post('/login',passport.authenticate(LOGIN_STRATEGY), sessionController.sessionLogin)

module.exports = router;