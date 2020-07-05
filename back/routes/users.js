const express = require('express')
const router = express.Router()
const {signUp} = require('../controllers/users')

router.post('/signup', signUp)
