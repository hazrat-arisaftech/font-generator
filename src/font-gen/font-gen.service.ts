import { Injectable, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Font } from './model.font';
import { Model } from 'mongoose';
// import * as svgtofont from 'svgtofont';
const svgtofont = require('svgtofont').default;
@Injectable()
export class FontGenService {
  constructor(@InjectModel('Font') private readonly fontModel: Model<Font>) {}
  getFont(): string {
    return 'Get your fonts here';
  }

  uploadFile(files: any): string {
    try {
      console.log('here ', files);
      files.map((f: any) => {
        const file = {
          file_path: f.path,
          file_name: f.originalname,
        };
        this.fontModel.create(file);
      });
    } catch (err) {
      console.log(err);
    }
    return 'File uploaded successfully';
  }
  getFile(): any {
    return this.fontModel.find();
  }
  convertFileType(): string {
    const svgtofont = require('svgtofont');
    const path = require('path');

    svgtofont({
      src: path.resolve(__dirname, '../../uploads'),
      dist: path.resolve(__dirname, 'fonts'),
      fontName: 'svgtofont',
      css: false,
      startUnicode: 0xea01,
      svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true,
      },
    }).then(() => {
      console.log('done!');
    });

    return 'File converted';
  }
}
