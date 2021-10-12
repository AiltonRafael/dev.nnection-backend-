import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

export const User = mongoose.model('User', UserSchema)
