/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductPrice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductTranslation" DROP CONSTRAINT "ProductTranslation_productId_fkey";

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Payments";

-- DropTable
DROP TABLE "ProductPrice";

-- DropTable
DROP TABLE "ProductTranslation";

-- CreateTable
CREATE TABLE "product_translations" (
    "id" SERIAL NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "product_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_prices" (
    "id" SERIAL NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "tariff_id" INTEGER NOT NULL,
    "isChecked" BOOLEAN NOT NULL DEFAULT false,
    "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkedAt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "photo_url" TEXT,
    "to_send_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "to_checked_date" TIMESTAMP(3),
    "currency" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "card_seria_number" TEXT NOT NULL,
    "countries" TEXT NOT NULL,
    "card_type" TEXT,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_translations_tariff_id_language_key" ON "product_translations"("tariff_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "product_prices_tariff_id_currency_key" ON "product_prices"("tariff_id", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "payments_photo_url_key" ON "payments"("photo_url");

-- CreateIndex
CREATE UNIQUE INDEX "cards_card_seria_number_key" ON "cards"("card_seria_number");

-- AddForeignKey
ALTER TABLE "product_translations" ADD CONSTRAINT "product_translations_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
