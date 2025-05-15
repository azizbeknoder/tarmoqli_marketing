-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "card_seria_number" TEXT NOT NULL,
    "cauntries" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_card_seria_number_key" ON "Card"("card_seria_number");
