const express = require('express')
const {
  check,
  validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const router = express.Router()


//create new user
router.post("/", [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Not a valid email').isEmail(),
  check('password', 'Minimum 6 characters are required for password').isLength({
    min: 6
  })
], async (req, res)=> {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()})
  }
  //check if user exist
  var {
    name,
    email,
    password
  } = req.body
  try {
    var user = await User.findOne({
      email
    })

    if (user) {
      return res.status(400).json({
        errors: [{
          msg: 'User already exist!'
        }]})
    }
    //grab user avatar
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    user = new User({
      name,
      email,
      avatar,
      password
    })

    //hash password

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

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