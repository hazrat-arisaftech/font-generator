import { Document } from 'mongoose';

export interface Ttf extends Document {
  id: string;
  file_path: string;
  file_name: string;
  uuid: string;
  user_id: string;
}
