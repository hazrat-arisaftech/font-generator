import { HttpException, Injectable, Res, Response } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model.users';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  authTest(): any {
    // return 'Testing auth';
    console.log('inside auth test');
    // console.log('users ', this.userModel.find());
    return this.userModel.find();
  }
  async signUp(body: User, res: any): Promise<any> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (user) {
      console.log('Exist');
      return res.status(403).json('User already exists');
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    await this.userModel.create({ email, password: hash });
    return res.status(200).json('User created');
  }
  async signIn(body: User, res: any): Promise<any> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) return res.status(404).json('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(403).json('Invalid credentials');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .cookie('accessToken', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token });
  }
}
