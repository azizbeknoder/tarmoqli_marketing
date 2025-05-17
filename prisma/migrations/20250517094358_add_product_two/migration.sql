-- CreateTable
CREATE TABLE "product_two" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" INTEGER NOT NULL,

    CONSTRAINT "product_two_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_two_photo" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "product_two_photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_two_translation" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "product_two_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_two_price" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_two_price_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_two_translation_productId_language_key" ON "product_two_translation"("productId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "product_two_price_productId_currency_key" ON "product_two_price"("productId", "currency");

-- AddForeignKey
ALTER TABLE "product_two" ADD CONSTRAINT "product_two_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_two_photo" ADD CONSTRAINT "product_two_photo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_two"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_two_translation" ADD CONSTRAINT "product_two_translation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_two"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_two_price" ADD CONSTRAINT "product_two_price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_two"("id") ON DELETE CASCADE ON UPDATE CASCADE;
