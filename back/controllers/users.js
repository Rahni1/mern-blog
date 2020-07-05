const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
const validateSignUpInput = require('../validation/signup')
const validateSignInInput = require('../validation/signin')
const User = require('../models/User')

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