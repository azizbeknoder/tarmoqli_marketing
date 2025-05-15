import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import CustomError from 'src/utils/custom-error';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService){}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException(403,"To'ken es kirgan yoki vaqti o'tgan")
    }

    const token = authHeader.split(' ')[1];
  
    
    try {
      const decoded = await this.authService.verifyAccessToken(token)

      if(!decoded){
        throw new UnauthorizedException("To'ken vaqti o'tgan yokida eskirgan")
      }
      request['user'] = decoded;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Token noto‘g‘ri yoki muddati o‘tgan');
    }
  }
}
