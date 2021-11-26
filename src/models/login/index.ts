import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

const PostSchema = new mongoose.Schema({
  message: String,
  user: Object,
  timestamp: Date,
  likes: Object,
  github: String,
  linkedin: String,
  image: String,
  tags: [],
})

export const User = mongoose.model('User', UserSchema)
export const Post = mongoose.model('Post', PostSchema)
