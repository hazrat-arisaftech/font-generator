import mongoose from 'mongoose';
export const FontSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  file_path: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});
