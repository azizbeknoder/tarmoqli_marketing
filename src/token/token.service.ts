import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
@Injectable()
export class TokenService {
    constructor(){}
    private readonly MAIL_SECRET = process.env.MAIL_TOKEN_SECRET
    private readonly ACCESS_SECRET = process.env.ACCESS_SECRET

    mailToken(payload: { name: string; email: string; password: string }) {
        const plainPayload = {
          name: payload.name,
          email: payload.email,
          password: payload.password,
        };
      
        return jwt.sign(plainPayload, this.MAIL_SECRET, {
          expiresIn: '3m',
        });
      }
      verifyMailToken(token:string){
        
        return jwt.verify(token,this.MAIL_SECRET)
      }
      accessTokenCreate(email:any):string{
        return jwt.sign({email:email},this.ACCESS_SECRET,{expiresIn:'48h'})
      }
}
