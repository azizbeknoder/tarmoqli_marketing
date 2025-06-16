/*
  Warnings:

  - A unique constraint covering the columns `[level]` on the table `ReferalLevel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReferalLevel_level_key" ON "ReferalLevel"("level");
