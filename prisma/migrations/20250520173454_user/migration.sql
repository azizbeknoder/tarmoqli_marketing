/*
  Warnings:

  - You are about to drop the column `photo_url` on the `main_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "main_products" DROP COLUMN "photo_url";

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "main_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
