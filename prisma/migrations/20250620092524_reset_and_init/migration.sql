/*
  Warnings:

  - Made the column `maxCount` on table `ReferalLevel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BonusReferalHistory" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "IncomeHistory" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "RecentUser" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ReferalLevel" ALTER COLUMN "count" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "maxCount" SET NOT NULL;

-- AlterTable
ALTER TABLE "StatistikaWeb" ALTER COLUMN "allCoin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "main_products" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "coin" SET DEFAULT 0,
ALTER COLUMN "coin" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "referalCoin" SET DEFAULT 0,
ALTER COLUMN "referalCoin" SET DATA TYPE DOUBLE PRECISION;
