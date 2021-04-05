// Require Express.js and create port
const express = require("express");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");

/// ======================================================================== //
// SET UP LOCAL HOST AND DATABASE
// ========================================================================= //

// Check if local host port has opened successfully
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Connect to dev.js or prod.js depending on process.env
const config = require("./config/key");

// Connect to MongoDB using Mongoose
const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// ========================================================================= //
// MODELS
// ========================================================================= //

// Get 'User' model from ./models/user.js
const { User } = require("./models/User");

// Get 'auth' model from ./middleware/auth.js
const { auth } = require("./middleware/auth");

// Use express to read/parse the body of incoming object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use cookie-parser to save generated token in cookie
app.use(cookieParser());

// ========================================================================= //
// ROUTES
// ========================================================================= //

// GET: INDEX ROUTE
app.get("/", (req, res) => {
  res.send("Hello World! This is a test.");
});

app.get("/api/hello/", (req, res) => {
  res.send("Hello testing proxy.");
});

// POST: REGISTER ROUTE =======================================================
// - Attain register-information from the client and store this info in the
//   database(MongoDB).
app.post("/api/users/register/", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    //  if error occurs
    if (err)
      return res.json({
        success: false,
        err,
      });
    //  if sucessful
    return res.status(200).json({
      success: true,
    });
  });
});

// POST: LOGIN ROUTE ==========================================================
app.post("/api/users/login/", (req, res) => {
  // 1. Check if the requested email exists in the database.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "We could not find any user with this email address.",
      });
    }
    // 2. If there is one, check if the requested password matches
    //    the user's password in the database.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Incorrect password.",
        });
      }
      // 3. If passwords match, then create token
      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        // Save token in cookie
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// GET: AUTHENTICATION ROUTE ==================================================
// - Need to use midleware called 'auth' in './middleware/auth.js'
app.get("/api/users/auth/", auth, (req, res) => {
  // If reached here, it must mean that the user has passed authentication
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// GET: LOGOUT ROUTE ==========================================================
app.get("/api/users/logout/", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).send({ success: true });
  });
});
