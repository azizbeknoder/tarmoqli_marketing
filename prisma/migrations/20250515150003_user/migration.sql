/*
  Warnings:

  - You are about to drop the column `isChacket` on the `Orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "isChacket",
ADD COLUMN     "isChecket" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "isChecket" BOOLEAN NOT NULL DEFAULT false;
