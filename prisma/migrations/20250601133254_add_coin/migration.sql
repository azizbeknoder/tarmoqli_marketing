-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_currency_key" ON "Coin"("currency");
