import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  user_name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  svgs_uuid: {
    type: [],
    default: [],
  },
  fonts: {
    type: [],
    default: [],
  },
});
