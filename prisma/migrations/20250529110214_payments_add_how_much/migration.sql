/*
  Warnings:

  - Added the required column `how_much` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "how_much" DOUBLE PRECISION NOT NULL;
