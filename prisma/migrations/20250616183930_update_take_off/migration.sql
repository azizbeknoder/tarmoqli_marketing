/*
  Warnings:

  - Added the required column `currency` to the `TakeOff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TakeOff" ADD COLUMN     "currency" TEXT NOT NULL;
