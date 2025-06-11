/*
  Warnings:

  - You are about to drop the column `contact` on the `orderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderProduct" DROP COLUMN "contact",
ADD COLUMN     "contactLink" TEXT,
ADD COLUMN     "contactNumber" TEXT;
