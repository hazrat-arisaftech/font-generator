import { Injectable, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Font } from './model.font';
import { Model } from 'mongoose';

@Injectable()
export class FontGenService {
  constructor(@InjectModel('Font') private readonly fontModel: Model<Font>) {}
  getFont(): string {
    return 'Get your fonts here';
  }

  uploadFile(): string {
    return 'File uploaded successfully';
  }
  getFile(): any {
    return this.fontModel.find();
  }
}
