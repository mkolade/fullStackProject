const express = require('express')
const {loginUser,signUpUser} = require('../controllers/userController')

const router = express.Router()

//Login router
router.post('/login',loginUser)

//Signup router
router.post('/signup',signUpUser)


module.exports = router