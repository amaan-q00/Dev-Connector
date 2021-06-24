const jwt = require('jsonwebtoken')
module.exports = (req, res, next)=> {
  //get token from header
  var token = req.header('x-auth-token')
  //check if token is valid
  if (!token) {
    return res.status(401).json({
      msg: 'Unauthorized request'
    })
  }
  //verify token
  const decoded = jwt.verify(token, 'mysecret')
  try {
    req.user = decoded.user
    next();
  }
  catch(err) {
    res.status(401).json({
      msg: 'Invalid token'
    })
  }
}