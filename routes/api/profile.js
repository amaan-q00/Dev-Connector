const express = require('express')
const request = require('request')
const multer= require('multer')
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const cloudinary = require("cloudinary").v2;
require('../../config/cloudConfig')
const {CloudUpload} = require("../../config/CloudUpload")
const {
    sendCancelationEmail
} = require('../../config/email')
const {
  check,
  validationResult
} = require('express-validator')
const router = express.Router()

const upload = multer({
  dest: "public",
    filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    }
})


//get my profile
router.get("/me", auth, async (req, res)=> {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ["name", "avatar"])
    res.json(profile)
  }
  catch (e) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//create and update profiles
router.post('/', [auth,upload.single('avatar')], async(req, res)=> {

 let errors=[]
 if (req.body.status.length<=0) errors.push({msg: 'Status is required'})
 if (req.body.skills.length<=0) errors.push({msg: 'Skills are required'})
  if (errors.length>0) {
    return res.status(400).send({
      errors})
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    facebook,
    twitter,
    youtube,
    instagram,
    linkedin
  } = req.body
  const fields = {}
  fields.user = req.user.id
  var allowedExt=["image/jpg","image/png","image/jpeg"]
  if (req.file){
  if(allowedExt.includes(req.file.mimetype) && req.file.size <= 2000000){
    var result = await CloudUpload(req.file.path)
    fields.avatar = result.url
  }
  else{
    errors.push({msg: "Please Upload an image file  under 2 MB only"})
    return res.status(400).send({
      errors})
  }
  }
  
  if (company) fields.company = company
  if (location) fields.location = location
  if (website) fields.website = website
  if (bio) fields.bio = bio
  if (status) fields.status = status
  if (githubusername) fields.githubusername = githubusername
  if (skills) {
    fields.skills = skills.split(',').map(skill=>skill.trim())
  }
  if (facebook) fields.facebook = facebook
  if (youtube) fields.youtube = youtube
  if (instagram) fields.instagram = instagram
  if (linkedin) fields.linkedin = linkedin
  if (twitter) fields.twitter = twitter
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    })
    if (profile) {
      profile = await Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: fields
      }, {
        new: true
      })
      return res.json(profile)
    }
    profile = new Profile(fields)
    await profile.save()
       
    return res.json(profile)

  }
  catch(err) {
    console.error(err)
    res.status(500).send('Server error')
  }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
   })

//get all profiles
router.get("/", async (req, res)=> {
  try {
    const profiles = await Profile.find().populate('user', ["name", "avatar"])
    res.json(profiles)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//get profile of logged in user
router.get("/user/:id", async (req, res)=> {
  try {
    const profile = await Profile.findOne({user: req.params.id}).populate('user', ["name", "avatar"])
    if (!profile) return res.status(400).send({
      msg: 'There is no profile for this user'
    })
    res.json(profile)
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({
        msg: 'There is no profile for this user'
      })
    }
    res.status(500).send('Server error')
  }
})

//delete a profile
router.delete("/", auth, async (req, res)=> {
  try {

    //remove posts of user

    await Post.deleteMany({
      user: req.user.id
    })
    //remove profile of user
    await Profile.findOneAndRemove({
      user: req.user.id
    })
    //remove user
    let user=await User.findOneAndRemove({
      _id: req.user.id
    })
    sendCancelationEmail(user.email,user.name)
    res.json({
      msg: 'User deleted'
    })
    
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//add experience
router.put('/experience', [auth, [
  check("title", "Title is required").not().isEmpty(),
  check("company", "Company is required").not().isEmpty(),
  check("from", "From date is required").not().isEmpty()]], async(req, res)=> {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()})
  }
  const {
    title,
    company,
    from,
    to,
    location,
    description,
    current
  } = req.body
  let newExp = {
    title,
    company,
    from,
    to,
    location,
    description,
    current
  }
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    profile.experience.unshift(newExp)
    await profile.save()
    res.json(profile)
  } catch (e) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//delete experience
router.delete("/experience/:id", auth, async (req, res)=> {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    const removeIndex = profile.experience.map(item=>item.id).indexOf(req.params.id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//add education
router.put('/education', [auth, [
  check("school", "School is required").not().isEmpty(),
  check("degree", "Degree is required").not().isEmpty(),
  check("from", "From date is required").not().isEmpty(),
  check("fieldofstudy", "Field of Study is required").not().isEmpty()]], async(req, res)=> {
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()})
  }
  const {
    school,
    degree,
    from,
    to,
    fieldofstudy,
    description,
    current
  } = req.body
  let newEdu = {
    school,
    degree,
    from,
    to,
    fieldofstudy,
    description,
    current
  }
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    profile.education.unshift(newEdu)
    await profile.save()
    res.json(profile)
  } catch (e) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//delete education
router.delete("/education/:id", auth, async (req, res)=> {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    const removeIndex = profile.education.map(item=>item.id).indexOf(req.params.id)
    profile.education.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

//github
router.get("/github/:username", async (req, res)=> {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GIT_ID}&client_secret=${process.env.GIT_SECRET}`,
      method: 'GET',
      headers: {
        'user-agent': 'node.js'
      }
    }
    request (options, (error, response, body)=> {
      if (error) console.error(error)
      if (response.statusCode !== 200) {
        return res.status(404).send({
          msg: 'No github user found'
        })
      }
      res.json(JSON.parse(body))
    })
  }
  catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})
module.exports = router