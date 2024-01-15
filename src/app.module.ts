import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontGenController } from './font-gen/font-gen.controller';
import { FontGenModule } from './font-gen/font-gen.module';
import { FontGenService } from './font-gen/font-gen.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    FontGenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
  controllers: [AppController, FontGenController],
  providers: [AppService, FontGenService],
})
export class AppModule {}
