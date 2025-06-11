/*
  Warnings:

  - You are about to drop the column `product_jd` on the `orderProduct` table. All the data in the column will be lost.
  - Added the required column `contact` to the `orderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderProduct" DROP COLUMN "product_jd",
ADD COLUMN     "contact" TEXT NOT NULL;
