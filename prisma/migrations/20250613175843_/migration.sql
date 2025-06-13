/*
  Warnings:

  - You are about to drop the column `currency` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `how_much` on the `payments` table. All the data in the column will be lost.
  - Made the column `coin` on table `payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "currency",
DROP COLUMN "how_much",
ALTER COLUMN "coin" SET NOT NULL;
