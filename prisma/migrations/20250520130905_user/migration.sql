/*
  Warnings:

  - You are about to drop the `product_two` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_two_photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_two_price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_two_translation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product_two" DROP CONSTRAINT "product_two_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "product_two_photo" DROP CONSTRAINT "product_two_photo_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_two_price" DROP CONSTRAINT "product_two_price_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_two_translation" DROP CONSTRAINT "product_two_translation_productId_fkey";

-- DropTable
DROP TABLE "product_two";

-- DropTable
DROP TABLE "product_two_photo";

-- DropTable
DROP TABLE "product_two_price";

-- DropTable
DROP TABLE "product_two_translation";
