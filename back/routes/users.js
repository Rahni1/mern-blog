const express = require('express')
const router = express.Router()
const {signUp, signIn} = require('../controllers/users')

router.post('/signup', signUp)

router.post('/signin', signIn)