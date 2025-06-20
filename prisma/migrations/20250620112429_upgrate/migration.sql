-- CreateTable
CREATE TABLE "CardNumber" (
    "id" SERIAL NOT NULL,
    "seriaNumber" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "type" "CoinType" NOT NULL DEFAULT 'MONEY',

    CONSTRAINT "CardNumber_pkey" PRIMARY KEY ("id")
);
