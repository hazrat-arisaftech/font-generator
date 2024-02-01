import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FontGenController } from './font-gen/font-gen.controller';
import { FontGenModule } from './font-gen/font-gen.module';
import { FontGenService } from './font-gen/font-gen.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Font } from './font-gen/model.font';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ValidateMiddleware } from './middlewares/validate/validate.middleware';
@Module({
  imports: [
    FontGenModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    FontGenController,
    UserController,
    AuthController,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateMiddleware)
      .exclude(
        { path: '/auth/signin', method: RequestMethod.POST },
        { path: '/auth/signup', method: RequestMethod.POST },
        // { path: '/font-gen/getfiles', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
