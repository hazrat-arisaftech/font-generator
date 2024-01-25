import mongoose from 'mongoose';

export const FontSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  file_path: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
