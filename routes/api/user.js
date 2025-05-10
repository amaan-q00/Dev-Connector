const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { sendWelcomeEmail, sendForgetEmail } = require("../../config/email");
const router = express.Router();
const TEMP_TOKEN=123456
//create new user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Not a valid email").isEmail(),
    check(
      "password",
      "Minimum 6 characters are required for password"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    //check if user exist
    var { name, email, password } = req.body;
    try {
      var user = await User.findOne({
        email,
      });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "User already exist!",
            },
          ],
        });
      }
      let token =TEMP_TOKEN
      // let token = Math.floor(100000 + Math.random() * 900000);
      user = new User({
        name,
        email,
        password,
        token,
      });

      //hash password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await sendWelcomeEmail(user.email, user.name, user.token);
      await user.save();

      res.json({
        msg: "Registered successfully, please verify your account to login",
      });
    } catch (err) {
      res.status(500).send("Server Error");
      console.error(err);
    }
  }
);
router.post(
  "/verify",
  [
    check("token", "Token is required").not().isEmpty(),
    check("email", "Not a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    var { email, token } = req.body;
    try {
      let user = await User.findOne({ email }).select("-password");
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "No user Found!",
            },
          ],
        });
      }
      if (user.token !== token) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid token!",
            },
          ],
        });
      }
      user.token = 0;
      user.verified = true;
      await user.save();
      //return jwt
      var payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        "mysecret",
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    } catch (err) {
      res.json({ error: "Server Error" });
      console.error(err);
    }
  }
);

router.post(
  "/forgot",
  [check("email", "Not a valid email").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    var { email } = req.body;
    try {
      let user = await User.findOne({ email }).select("-password");
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "No user Found!",
            },
          ],
        });
      }
      let newToken = TEMP_TOKEN
      // let newToken = Math.floor(100000 + Math.random() * 900000);
      user.token = newToken;
      await sendForgetEmail(user.email, user.name, newToken);

      await user.save();
      res.json({
        msg: "Please check your mail for reset instructions",
      });
    } catch (err) {
      res.json({ error: "Server Error" });
      console.error(err);
    }
  }
);

router.post(
  "/reset",
  [
    check("token", "Token is required").not().isEmpty(),
    check(
      "password",
      "Minimum 6 characters are required for password"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({
        errors: errors.array(),
      });
    }
    //check if user exist
    var { token, password } = req.body;
    try {
      var user = await User.findOne({
        token: token,
      });

      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Invalid Token!",
            },
          ],
        });
      }

      //hash password

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.token = 0;
      await user.save();

      res.json({
        msg: "Successfully Changed password",
      });
    } catch (err) {
      res.status(500).send("Server Error");
      console.error(err);
    }
  }
);
module.exports = router;
