const express = require('express')
require("dotenv").config() // loads env variables
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require("passport")

// import routes
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
// app
const app = express()

// connect db
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("DB connected"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// initialize passport
app.use(passport.initialize())

// pass passport as param to the function exported by this file
require("./middleware/passport")(passport)


// routes middleware
app.use(userRoutes)
app.use("/posts/", postRoutes)


const port = 8000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})