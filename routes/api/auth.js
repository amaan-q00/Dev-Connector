const express = require('express')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const {
  check,
  validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')
const router = express.Router()

//get logged in user
router.get("/", auth, async (req, res)=> {
  try {
    let user = await User.findById(req.user.id).select('-password')
    res.json(user)
  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})


//log in a user
router.post("/login", [
  check('email', 'Not a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res)=> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()})
  }
  //check if user exist
  var {
    email,
    password
  } = req.body
  try {
    var user = await User.findOne({
      email
    })

    if (!user) {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid credentials!'
        }]})
    }
        if (!user.verified) {
      return res.status(400).json({
        errors: [{
          msg: 'Verify your account to continue!'
        }]})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        errors: [{
          msg: 'Invalid credentials!'
        }]})
    }
    //return jwt
    var payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, 'mysecret', {
      expiresIn: 360000
    }, (err, token)=> {
      if (err) throw err;
      res.json({
        token
      })
    })
  }
  catch(err) {
    res.status(500).send('Server Error')
    console.error(err)
  }
})
module.exports = router