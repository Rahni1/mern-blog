const express = require('express')
const router = express.Router()


const {
    signup,
    signin,
    signout,
    googlelogin
} = require("../controllers/users");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/googlelogin", googlelogin)

module.exports = router