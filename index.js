const express = require('express')
const app = express()
require('./config/db-config')
const path=require('path')
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

if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}


app.listen(port, ()=> {
  console.log(`Server is running on port ${port}`)
})