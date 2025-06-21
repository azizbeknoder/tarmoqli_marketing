/*
  Warnings:

  - The `type` column on the `CardNumber` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "CardNumber" DROP COLUMN "type",
ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "type",
ADD COLUMN     "type" TEXT;
