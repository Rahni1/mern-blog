const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = validateSignInInput = data => {
    // set errors to empty object
    let errors = {}

    // destructure email & password from data
    let {email, password} = data

    // convert empty fields to empty strings as validator only accepts strings
    email = !isEmpty(email) ? email : ""
    password = !isEmpty(password) ? password : ""

// if email field is empty 
if (Validator.isEmpty(email)) {
    errors.email = "Email is required"
    // if email is not in the form of an email address
} else if (!Validator.isEmail(email)) {
    errors.email = "Enter a valid email"
}

// if password field is empty
if (Validator.isEmpty(password)) {
    errors.password = "Password is required"
    // if length isn't between 6 and 30 chars
} else if (!Validator.isLength(password, { min: 6, max: 30})) {
    errors.password = "Password must be at least 6 characters"
}

return {
    errors,
    isValid: isEmpty(errors)
}
}