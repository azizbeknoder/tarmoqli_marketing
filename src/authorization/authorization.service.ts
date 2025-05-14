import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDtoLogin, AuthDtoRegister } from './dto/auth.dot.ts/auth.dto';
import CustomError from 'src/utils/custom-error';
import { MailService } from 'src/mail/mail.service';
import { TokenService } from 'src/token/token.service';
import * as bcrypt from 'bcrypt'
import { ReferalService } from 'src/referal/referal.service';
@Injectable()
export class AuthorizationService {
    constructor(
        private prisma:PrismaService,
        private mailService:MailService,
        private token:TokenService,
        private referal:ReferalService   
    ){}

    async register(body:AuthDtoRegister){
        const {name,email,password} = body
        const oldUser = await this.prisma.users.findMany({where:{email:email}})
        
        if(oldUser[0]){
            throw new CustomError(402,"Bu foydalanuvchi avval ro'yhatdan o'tgan")
        }
        const mailToken = await this.token.mailToken(body)
        await this.mailService.sendMail(body.email,mailToken)
    return {message:"Emailingizga tasdiqlash codesi yuborildi"}
        
    }

    async verify(token:string){
        const user = this.token.verifyMailToken(token)
        const {name,email,password,referal}:AuthDtoRegister = user
        const oldUser = await this.prisma.users.findMany({where:{email:email}})
        if(oldUser[0]){
            throw new CustomError(403,"Sizning emailniz muvafaqtiyatli tasdiqlangan")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const result = await this.prisma.users.create({data:{name,email,password:hashedPassword}})
        const releferal_user_id = await this.prisma.referral.findMany({where:{referal_token:referal}})
        const createReferalToken = this.referal.createReferal(email)
        await this.prisma.referral.create({data:{referal_token:String(createReferalToken),referal_user_id:releferal_user_id[0].id}})
        return result[0]
    }

    async login(body:AuthDtoLogin){
        const {email, password} = body
        const oldUser = await this.prisma.users.findMany({where:{email:email}})
        if(!oldUser[0]){
            throw new CustomError(404,"Ro'yhatdan o'ting!")
        }
        const deHashedPassword = await bcrypt.compare(oldUser[0].password,password)

        if(deHashedPassword){
            throw new CustomError(400,"Email yoki parol xato!")
        }
        const token = await this.token.accessTokenCreate(email)
        return {token:token}

    }

}

