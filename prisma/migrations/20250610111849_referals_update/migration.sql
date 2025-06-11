/*
  Warnings:

  - You are about to drop the column `referals` on the `referal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "referal" DROP CONSTRAINT "referal_referals_fkey";

-- AlterTable
ALTER TABLE "referal" DROP COLUMN "referals";
