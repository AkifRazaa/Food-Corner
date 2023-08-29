const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "Thisismyfirstmernstackproject1$#";
const app = express();

// Middleware to parse incoming JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route for SignUp
router.post(
  "/createuser",

  //input validations criteria
  [body("email").isEmail(), body("password").isLength({ min: 5 })],

  async (req, res) => {
    //This is to check if the data being received meets the above validations or not.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //Using bcrypt for password encryption
    //We have to use await because bcrypt function are async functions which returns promise
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    //If validation criteria is fulfilled then this code will execute
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword, //Here the encrypted password will be passed to the database
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//Route for Login
router.post(
  "/loginuser",

  //input validations criteria
  [body("email").isEmail(), body("password").isLength({ min: 5 })],

  async (req, res) => {
    //This is to check if the data being received meets the above validations or not.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }

      //This will compare the hash password with the user entered password
      const passwordCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      ); //It return true or false

      if (!passwordCompare) {
        return res.status(400).json({ errors: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
