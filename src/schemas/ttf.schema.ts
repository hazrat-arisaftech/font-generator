import mongoose from 'mongoose';

export const TtfSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  file_name: {
    type: String,
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  }
});
