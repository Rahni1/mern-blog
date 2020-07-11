exports.userSignupValidator = (req, res, next) => {
    // checks if empty
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/) // checks for email pattern using regex
    .withMessage('Email must contain @')
    // checks length of email
    .isLength({
        min: 4,
        max: 32
    })
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/) // must have at least one digit 
    .withMessage("Password must contain a number")
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    // when creating middleware, next() prevents app from coming to hault
    // and moves it to next phase whether it succeeded or failed
    next()
}
