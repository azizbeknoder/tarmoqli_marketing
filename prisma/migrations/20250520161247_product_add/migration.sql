/*
  Warnings:

  - A unique constraint covering the columns `[product_id,currency]` on the table `product_prices` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_id,language]` on the table `product_translations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "product_prices" ADD COLUMN     "product_id" INTEGER,
ALTER COLUMN "tariff_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_translations" ADD COLUMN     "product_id" INTEGER,
ALTER COLUMN "tariff_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "main_products" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_user" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "main_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_prices_product_id_currency_key" ON "product_prices"("product_id", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "product_translations_product_id_language_key" ON "product_translations"("product_id", "language");

-- AddForeignKey
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "main_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "main_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "main_products" ADD CONSTRAINT "main_products_created_user_fkey" FOREIGN KEY ("created_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
