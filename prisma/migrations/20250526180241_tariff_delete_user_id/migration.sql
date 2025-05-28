/*
  Warnings:

  - You are about to drop the column `created_user` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_created_user_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "created_user";
