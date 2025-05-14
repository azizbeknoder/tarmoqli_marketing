import { Injectable } from '@nestjs/common';
import * as crytp from 'crypto'
@Injectable()
export class ReferalService {
    constructor(){}
    async createReferal(email:string){
        return  await crytp.randomBytes(16).toString('hex') 
    }
}
