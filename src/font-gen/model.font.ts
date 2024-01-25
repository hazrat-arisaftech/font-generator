import { Document } from 'mongoose';

export interface Font extends Document {
  id: string;
  file_path: string;
  file_name: string;
  uuid: string;
}
