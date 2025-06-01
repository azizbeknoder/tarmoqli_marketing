/*
  Warnings:

  - You are about to drop the `TariffPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_prices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TariffPrice" DROP CONSTRAINT "TariffPrice_tariff_id_fkey";

-- DropForeignKey
ALTER TABLE "product_prices" DROP CONSTRAINT "product_prices_product_id_fkey";

-- AlterTable
ALTER TABLE "main_products" ADD COLUMN     "coin" BIGINT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "coin" BIGINT;

-- DropTable
DROP TABLE "TariffPrice";

-- DropTable
DROP TABLE "product_prices";
