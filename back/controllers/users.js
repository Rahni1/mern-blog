const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const validateSignUpInput = require('../validation/signup')
const validateSignInInput = require('../validation/signin')
const User = require('../models/User')
const { Router } = require('express')

exports.signUp = (req, res) => {
    // validate user input 
    const {errors, isValid} = validateSignUpInput(req.body)
    const {user_name, email, password} = req.body
    // if input is invalid, return appropriate error
    if (!isValid) {
        return res.status(400).json(errors)
    }
    // otherwise, search db for same username or email
    User.findOne({$or:[{email}, {user_name}]}).then(user => {
        // if same username or email found, return appropriate error
        if (user) {
if (user.email === email) {
    return res.status(400).json({ 
        email: "Email already exists"
    })
} else {
    return res.status(400).json({
        user_name: "Username already exists"
    })
}
// otherwise, create new user and store details in db
        } else {
const newUser = new User({user_name, email, password}) 
// hash password using bcrypt
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
if (err) throw err
newUser.password = hash
// save details in db
newUser.save()
.then(user => res.json(user))
.catch(err => {
    console.log({ error: "Error creating a new user"})
})
    })
})
        }
    })

}

exports.signIn = (req, res) => {
    const { errors, isValid } = validateSignInInput(req.body)
    // check for invalid input, if invalid return appropriate error
    if (!isValid) {
        return res.status(400).json(errors)
    }
    // else, check for user in db
    const { email, password } = req.body
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json({email: "Email not found"})
        }
// if user exists, compare password with hashed password in db using bcrypt
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // create payload
                const payload = {
                    id: user.id,
                    user_name: user.user_name
                }
                // sign it in with secret key, set expiry time for token 
                // & send response to user
                jwt.sign(payload, SECRET, { expiresIn: 3600 }, (err, token) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res.status(400).json({password: "Password Incorrect"})
            }
        })
    })
}
