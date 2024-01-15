import {
  Body,
  Controller,
  Get,
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

@Controller('font-gen')
export class FontGenController {
  constructor(private readonly fontGen: FontGenService) {}

  @Get('/')
  getFont(): string {
    return this.fontGen.getFont();
  }
  @Post('/upload')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.fontGen.uploadFile();
  }

  @Get('/getFile')
  getFile(): any {
    // console.log(first)
    return this.fontGen.getFile();
  }
}
