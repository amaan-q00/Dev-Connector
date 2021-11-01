const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  image:{
    type: String
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    image:{
      type: String
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    }
    }, {
    timestamps: true
}]
  })
  module.exports = mongoose.model('posts', PostSchema)