import { PrismaService } from "src/prisma/prisma.service"
import * as bcrypt from 'bcrypt'
 const createSuperAdmin = async ()=>{
    const prisma = new PrismaService()
    const oldSuperAdmin = await prisma.users.findMany({where:{email:'superadmin@gmail.com'}})
    if(oldSuperAdmin[0]){
        return 0
    }
    const password = await bcrypt.hash('12345678',10)
    await prisma.users.create({data:{name:"admin",email:'superadmin@gmail.com',password:password,role:"SUPERADMIN",}})
}
export default createSuperAdmin

