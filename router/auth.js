const express = require('express')
const { Login, Register, forgetPassword, Resetpass } = require('../controller/auth')

const router = express.Router()


router.post('/login',Login)

router.post('/register',Register)

router.post('/forgetpassword',forgetPassword)

router.post('/resetpass/:id/:token',Resetpass) 

module.exports = router 