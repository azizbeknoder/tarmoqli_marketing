-- DropForeignKey
ALTER TABLE "product_prices" DROP CONSTRAINT "product_prices_tariff_id_fkey";

-- DropForeignKey
ALTER TABLE "product_translations" DROP CONSTRAINT "product_translations_tariff_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "dailyProfit" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "TariffTranslation" (
    "id" SERIAL NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "longDescription" TEXT,
    "features" TEXT,
    "usage" TEXT,

    CONSTRAINT "TariffTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TariffPrice" (
    "id" SERIAL NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TariffPrice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TariffTranslation_tariff_id_language_key" ON "TariffTranslation"("tariff_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "TariffPrice_tariff_id_currency_key" ON "TariffPrice"("tariff_id", "currency");

-- AddForeignKey
ALTER TABLE "TariffTranslation" ADD CONSTRAINT "TariffTranslation_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TariffPrice" ADD CONSTRAINT "TariffPrice_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
