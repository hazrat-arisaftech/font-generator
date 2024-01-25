import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './model.users';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/test')
  authTest(): any {
    return this.authService.authTest();
  }

  @Post('/signup')
  signUp(@Body() body: User, @Res() res: Response): any {
    return this.authService.signUp(body, res);
  }
  @Post('/signin')
  signIn(@Body() body: User, @Res() res: Response): any {
    return this.authService.signIn(body, res);
  }
}
