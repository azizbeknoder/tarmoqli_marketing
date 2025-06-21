/*
  Warnings:

  - Added the required column `tariff_id` to the `IncomeHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncomeHistory" ADD COLUMN     "tariff_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "IncomeHistory" ADD CONSTRAINT "IncomeHistory_tariff_id_fkey" FOREIGN KEY ("tariff_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
