/*
  Warnings:

  - The `isChecked` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "isChecked",
ADD COLUMN     "isChecked" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
