import mongoose from "mongoose"

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
      required: false,
    }
  });
  
  export const User = mongoose.model("User", UserSchema);
  
  module.exports = User;