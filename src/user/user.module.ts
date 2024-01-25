import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Mongoose } from 'mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
