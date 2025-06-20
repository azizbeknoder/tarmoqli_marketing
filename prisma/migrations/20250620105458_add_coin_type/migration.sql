/*
  Warnings:

  - The `type` column on the `Coin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CoinType" AS ENUM ('CRYTO', 'MONEY');

-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "type",
ADD COLUMN     "type" "CoinType" NOT NULL DEFAULT 'MONEY';
