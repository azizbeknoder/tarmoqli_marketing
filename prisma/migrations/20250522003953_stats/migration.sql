/*
  Warnings:

  - You are about to drop the column `username` on the `RecentUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `RecentUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RecentUser" DROP COLUMN "username",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RecentUser_email_key" ON "RecentUser"("email");
