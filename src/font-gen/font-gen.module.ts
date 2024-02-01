import { Module } from '@nestjs/common';
import { FontGenService } from './font-gen.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FontGenController } from './font-gen.controller';
import { FontSchema } from 'src/schemas/font.schema';
import { TtfSchema } from 'src/schemas/ttf.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Font', schema: FontSchema },
      { name: 'Ttf', schema: TtfSchema },
    ]),
  ],
  controllers: [FontGenController],
  providers: [FontGenService],
  exports: [FontGenService],
})
export class FontGenModule {}
