/*
  Warnings:

  - Made the column `coin` on table `main_products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `referals` to the `referal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "referal" DROP CONSTRAINT "referal_referal_user_id_fkey";

-- AlterTable
ALTER TABLE "main_products" ALTER COLUMN "coin" SET NOT NULL;

-- AlterTable
ALTER TABLE "referal" ALTER COLUMN "referal_user_id" DROP DEFAULT,
DROP COLUMN "referals",
ADD COLUMN     "referals" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "referal" ADD CONSTRAINT "referal_referals_fkey" FOREIGN KEY ("referals") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
