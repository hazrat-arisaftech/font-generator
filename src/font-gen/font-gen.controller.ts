import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FontGenService } from './font-gen.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import * as fs from 'fs';
import { s3Client } from '../aws/aws-config';
// import { S3 } from 'aws-sdk';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3 } from '@aws-sdk/client-s3';
import { Response } from 'express';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Font generator')
@Controller('font-gen')
export class FontGenController {
  constructor(private readonly fontGen: FontGenService) {}

  // @Get('/')
  // getFont(): string {
  //   return this.fontGen.getFont();
  // }

  @Post('/svgtottf')
  convertFileType(@Body() body): string {
    return this.fontGen.convertFileType(body);
  }
  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('files', 62, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          let spl = file.originalname.split('.');
          // let date = new Date();
          // let hrs = date.getHours();
          // let mins = date.getMinutes();
          // let ms = date.getMilliseconds();
          spl[spl.length - 2] += Date.now();
          console.log();
          let newName = spl.join('.');
          file.originalname = newName.replace(/ /g, '_');
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  // async uploadMultipleFiles(@UploadedFiles() files) {
  //   // const s3 = new S3();
  //   for (let file of files) {
  //     const params = {
  //       Bucket: process.env.S3_BUCKET_NAME,
  //       Key: `/uploads/${file.originalname}`,
  //       Body: fs.createReadStream(file.path),
  //     };

  //     try {
  //       console.log('over command');
  //       const command = new PutObjectCommand(params);
  //       const url = await getSignedUrl(s3Client, command);
  //       return url;
  //     } catch (err) {
  //       console.log('Error uploading file:', err);
  //     }
  //   }
  // }
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
    return this.fontGen.uploadFile(files, body);
  }

  @Get('/allfiles')
  @ApiOperation({ summary: 'Get all files' })
  @ApiCookieAuth('Authorization')
  getFiles(@Body() body: any): Promise<any> {
    return this.fontGen.getFiles(body.user_id);
  }
  @Get('/deletefiles')
  deleteFiles(@Body() body: any): Promise<string> {
    return this.fontGen.deleteFiles(body.user_id);
  }
  @Get('/download/:user_id/:uuid')
  downloadFile(@Param() params: any, @Res() res: Response): Promise<string> {
    console.log('params ', params);
    console.log('Response obj ', res);

    return this.fontGen.downloadFile(params, res);
  }
}
