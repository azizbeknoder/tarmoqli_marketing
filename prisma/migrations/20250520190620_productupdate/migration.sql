/*
  Warnings:

  - You are about to drop the column `body` on the `product_translations` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `product_translations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product_translations" DROP COLUMN "body",
DROP COLUMN "title",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "features" TEXT,
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "usage" TEXT,
ALTER COLUMN "language" DROP NOT NULL;
