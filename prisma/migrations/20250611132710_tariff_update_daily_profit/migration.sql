/*
  Warnings:

  - You are about to alter the column `dailyProfit` on the `products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "dailyProfit" SET DEFAULT 0,
ALTER COLUMN "dailyProfit" SET DATA TYPE INTEGER;
