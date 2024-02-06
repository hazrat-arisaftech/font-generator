import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './model.users';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

class SignupDTO {
  @ApiProperty({
    example: 'example@gmail.com',
    required: true,
  })
  email: String;

  @ApiProperty()
  password: String;
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/test')
  @ApiCookieAuth('Authorization')
  @ApiResponse({
    status: 201,
    description: 'Logged in',
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  authTest(): any {
    return this.authService.authTest();
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignupDTO })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'User already exists',
  })
  signUp(@Body() body: User, @Res() res: Response): any {
    return this.authService.signUp(body, res);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: SignupDTO })
  @ApiResponse({
    status: 201,
    description: 'Logged in',
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @Post('/signin')
  signIn(@Body() body: User, @Res() res: Response): any {
    return this.authService.signIn(body, res);
  }
}
