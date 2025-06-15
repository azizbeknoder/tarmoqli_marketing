/*
  Warnings:

  - Made the column `referal_user_id` on table `referal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "referal" ALTER COLUMN "referal_user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "ReferalBonus" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferalBonus_pkey" PRIMARY KEY ("id")
);
