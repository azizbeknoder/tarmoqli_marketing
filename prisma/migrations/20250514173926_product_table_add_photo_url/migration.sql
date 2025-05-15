/*
  Warnings:

  - Added the required column `photo_url` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "photo_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "referal" ALTER COLUMN "referal_user_id" SET DEFAULT 1;
