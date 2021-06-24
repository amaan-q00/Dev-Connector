const express = require('express')
const app = express()
require('./config/db-config')
const port = process.env.PORT || 2000

//middlewares
app.use(express.json({
  extended: false
}))

//routes
app.use('/api/users', require("./routes/api/user"))
app.use('/api/posts', require("./routes/api/post"))
app.use('/api/profile', require("./routes/api/profile"))
app.use('/api/auth', require("./routes/api/auth"))



app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
})