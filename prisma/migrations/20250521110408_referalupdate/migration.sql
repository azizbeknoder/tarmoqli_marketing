/*
  Warnings:

  - You are about to drop the column `referal_token` on the `referal` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "referal_referal_token_key";

-- AlterTable
ALTER TABLE "referal" DROP COLUMN "referal_token";
