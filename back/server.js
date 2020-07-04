const express = require('express')
require("dotenv").config() // loads env variables
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

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

const port = 8000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})