/*
  Warnings:

  - You are about to drop the column `lastBonusDate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTarif" ADD COLUMN     "lastBonusDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "lastBonusDate";
