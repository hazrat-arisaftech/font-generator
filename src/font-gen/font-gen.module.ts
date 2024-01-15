import { Module } from '@nestjs/common';
import { FontGenService } from './font-gen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FontGenController } from './font-gen.controller';
import { Font } from './model.font';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Font', schema: FontGenModule }]),
  ],
  controllers: [FontGenController],
  providers: [FontGenService],
  exports: [],
})
export class FontGenModule {}
