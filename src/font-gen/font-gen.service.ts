import {
  Body,
  HttpException,
  Inject,
  Injectable,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Font } from './model.font';
import { Ttf } from './ttf.model';
import { Model } from 'mongoose';
import * as archiver from 'archiver';
// import * as svgtofont from 'svgtofont';
import * as fs from 'fs';
import * as path from 'path';
const svgtofont = require('svgtofont').default;
@Injectable()
export class FontGenService {
  constructor(
    @InjectModel('Font') private readonly fontModel: Model<Font>,
    @InjectModel('Ttf') private readonly ttfModel: Model<Ttf>,
  ) {}

  // getFont(): string {
  //   return 'Get your fonts here';
  // }

  uploadFile(files: any, body: any): string {
    try {
      const uuid = Date.now();
      files.map((f: any) => {
        const file = {
          file_path: f.path,
          file_name: f.originalname,
          uuid: uuid,
        };
        this.fontModel.create(file);
      });
    } catch (err) {
      console.log(err);
    }
    return 'File uploaded successfully';
  }
  async getFiles(user_id: string): Promise<any> {
    try {
      console.log('sending from get all files ', user_id);
      const ttfs = await this.ttfModel.find({ user_id });
      return ttfs;
    } catch (e) {
      return 'something went wrong';
    }
  }
  async deleteFiles(user_id: string): Promise<string> {
    try {
      await this.ttfModel.deleteMany({ user_id: user_id });
      const dir_path = `./fonts/${user_id}`;
      if (fs.existsSync(dir_path)) {
        fs.rmdirSync(dir_path, { recursive: true });
      } else {
        console.log(`Directory ${dir_path} does not exist.`);
      }
      return 'Files deleted';
    } catch (err) {
      console.log('Delete error ', err);
      return 'Something went wrong';
    }
  }

  async downloadFile({ user_id, uuid }: any, res: any): Promise<any> {
    try {
      const folderPath = `./fonts/${user_id}/${uuid}`;
      if (!folderPath) {
        return res.status(400).send('Folder path is required');
      }

      if (!fs.existsSync(folderPath)) {
        return res.status(404).send('Folder not found');
      }

      const zipFilePath = path.join(__dirname, 'downloaded-folder.zip');
      const archive = archiver('zip', { zlib: { level: 9 } });

      const output = fs.createWriteStream(zipFilePath);

      output.on('close', () => {
        res.download(zipFilePath, 'downloaded-folder.zip', (err) => {
          fs.unlinkSync(zipFilePath);
        });
      });

      archive.on('error', (err) => {
        res.status(500).send('Error creating zip file');
      });

      archive.pipe(output);

      archive.directory(folderPath, false);
      archive.finalize();
    } catch (e) {
      console.log('something went wrong', e);
    }
  }
  convertFileType(body: any): string {
    const svgtofont = require('svgtofont');
    const path = require('path');
    console.log(body);
    const date = Date.now();
    svgtofont({
      src: path.resolve(__dirname, '../../uploads'),
      dist: path.resolve(__dirname, `../../fonts/${body.user_id}/${date}`),
      fontName: `${body.fileName}`,
      css: false,
      startUnicode: 0xea01,
      svgicons2svgfont: {
        fontHeight: 1000,
        normalize: true,
      },
    }).then(() => {
      const ttf_file = {
        file_path: `../fonts/${body.user_id}/${date}`,
        file_name: `${body.file_name}`,
        uuid: date,
        user_id: `${body.user_id}`,
      };
      this.ttfModel.create(ttf_file);
      console.log('done!');
    });

    return 'File converted';
  }
}
