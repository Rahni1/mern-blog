const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
const path = require("path");

require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
// app
const app = express();

// connect db - first arg is url (specified in .env)
const url = process.env.MONGODB_URI 
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("DB Connected!");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });

// middlewares
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use(morgan("dev"));
app.use(bodyParser.json());
// used to save users credentials
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
 // routes middleware
 app.use(express.static(path.join(__dirname, './client/build')))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(authRoutes);
app.use(userRoutes);
app.use('/post', postRoutes);

app.post("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
