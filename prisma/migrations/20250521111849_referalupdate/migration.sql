/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `referal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "referal_user_id_key" ON "referal"("user_id");
