import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  user_name: string;
  password: string;
}
