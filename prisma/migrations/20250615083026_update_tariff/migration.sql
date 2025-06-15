/*
  Warnings:

  - You are about to drop the `UserBalance` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `coin` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserBalance" DROP CONSTRAINT "UserBalance_userId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "coin" SET NOT NULL;

-- DropTable
DROP TABLE "UserBalance";
