import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class ValidateMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res() res: Response, next: () => void) {
    const token = req.rawHeaders[3];
    const trimmedToken = token.split('=')[1];
    jwt.verify(
      trimmedToken,
      process.env.JWT_SECRET,
      function (err: any, user: any) {
        if (!err) {
          // console.log('trimmed token', trimmedToken);
          console.log(err);
          console.log('verified user ', user);
          next();
        } else {
          console.log(err);
          return res.status(401).json('Log in first');
        }
      },
    );
  }
}
