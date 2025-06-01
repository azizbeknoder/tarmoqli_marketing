/*
  Warnings:

  - You are about to alter the column `coin` on the `main_products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `coin` on the `products` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The `coin` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "main_products" ALTER COLUMN "coin" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "card" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "coin" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "coin",
ADD COLUMN     "coin" INTEGER DEFAULT 0;
