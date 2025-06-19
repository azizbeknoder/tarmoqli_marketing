/*
  Warnings:

  - Made the column `referalCoin` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "referalCoin" SET NOT NULL,
ALTER COLUMN "referalCoin" SET DEFAULT 0;
