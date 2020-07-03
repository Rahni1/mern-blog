const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("DB connected"))

const port = 8000 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})