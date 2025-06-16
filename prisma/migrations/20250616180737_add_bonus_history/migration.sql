/*
  Warnings:

  - You are about to drop the `ReferalBonus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ReferalBonus";

-- CreateTable
CREATE TABLE "IncomeHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "coin" INTEGER NOT NULL,

    CONSTRAINT "IncomeHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IncomeHistory" ADD CONSTRAINT "IncomeHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
