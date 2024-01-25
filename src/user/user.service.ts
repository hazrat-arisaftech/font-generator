import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './model.user';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  testing(): string {
    return 'Hello testing';
  }
}
