/*
  Warnings:

  - Added the required column `rating` to the `main_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewiev` to the `main_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "main_products" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "rewiev" INTEGER NOT NULL;
