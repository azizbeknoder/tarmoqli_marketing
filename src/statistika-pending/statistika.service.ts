// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateStatsWidgetDto } from './dto/statistika.create';
// import { Prisma } from '@prisma/client';
// import { UpdateStatsWidgetDto } from './dto/statistike.update';

// @Injectable()
// export class StatistikaService {
//     constructor(private prisma:PrismaService){}
//     async create(body: CreateStatsWidgetDto) {
//         const data = await this.prisma.statsWidget.create({
//           data: {
//             onlineUserCount: body.onlineUserCount,
//             totalEarned: new Prisma.Decimal(body.totalEarned),
//             statEarnings: {
//               create: body.statEarnings.map((earning) => ({
//                 currency: earning.currency,
//                 amount: new Prisma.Decimal(earning.amount),
//               })),
//             },
//             recentUsers: {
//               create: body.recentUsers.map((user) => ({
//                 email: user.email,
//                 userEarnings: {
//                   create: user.userEarnings.map((ue) => ({
//                     currency: ue.currency,
//                     amount: new Prisma.Decimal(ue.amount),
//                   })),
//                 },
//               })),
//             },
//           },
//           include: {
//             statEarnings: true,
//             recentUsers: {
//               include: {
//                 userEarnings: true,
//               },
//             },
//           },
//         });
    
//         return data;
//       }
//       async getAll(){
//         const data = await this.prisma.statsWidget.findMany({include:{statEarnings:true,recentUsers:true,}})
//         return data
//       }
//       async delete(id:string){
//         const data = await this.prisma.statsWidget.delete({where:{id:id},include:{recentUsers:true,}})
//         return data
//       }
//       async update(id: string, body: UpdateStatsWidgetDto) {
//         // widgetni yangilash
//         const updatedWidget = await this.prisma.statsWidget.update({
//           where: { id },
//           data: {
//             onlineUserCount: body.onlineUserCount,
//             totalEarned: body.amountEarned ? new Prisma.Decimal(body.amountEarned) : undefined,
    
//             // statEarnings ni yangilash: oldin o'chirish va yangi qo'shish misoli
//             statEarnings: body.statEarnings
//               ? {
//                   deleteMany: { widgetId: id },
//                   create: body.statEarnings.map((item) => ({
//                     currency: item.currency,
//                     amount: new Prisma.Decimal(item.amount),
//                   })),
//                 }
//               : undefined,
    
//             // recentUsers ni yangilash: murakkabroq, avval mavjudlarini update yoki delete qilishingiz kerak
//             recentUsers: body.recentUsers
//               ? {
//                   // bu yerda faqat yangilarini qo'shish uchun create ishlatilmoqda,
//                   // haqiqiy loyihada update va delete ham kerak bo'ladi
//                   create: body.recentUsers.map((user) => ({
//                     email: user.email,
//                     userEarnings: {
//                       create: user.userEarnings.map((ue) => ({
//                         currency: ue.currency,
//                         amount: new Prisma.Decimal(ue.amount),
//                       })),
//                     },
//                   })),
//                 }
//               : undefined,
//           },
//           include: {
//             recentUsers: {
//               include: { userEarnings: true },
//             },
//             statEarnings: true,
//           },
//         });
    
//         return updatedWidget;
//       }
// }
