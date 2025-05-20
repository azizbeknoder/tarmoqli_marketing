/*
  Warnings:

  - You are about to drop the column `isChecket` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Payments` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'CANCELLED', 'SUCCESS');

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_product_id_fkey";

-- DropIndex
DROP INDEX "Payments_order_id_key";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "isChecket",
DROP COLUMN "order_id",
DROP COLUMN "product_id",
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "photo_url" DROP NOT NULL;
