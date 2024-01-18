import { Module } from '@nestjs/common';
import { FontGenService } from './font-gen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FontGenController } from './font-gen.controller';
import { Font } from './model.font';
import { FontSchema } from 'src/schemas/font.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Font', schema: FontSchema }])],
  controllers: [FontGenController],
  providers: [FontGenService],
  exports: [FontGenService],
})
export class FontGenModule {}
