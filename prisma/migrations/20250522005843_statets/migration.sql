/*
  Warnings:

  - The primary key for the `RecentUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `earnedAmount` on the `RecentUser` table. All the data in the column will be lost.
  - You are about to drop the column `statsWidgetId` on the `RecentUser` table. All the data in the column will be lost.
  - The primary key for the `StatsWidget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `StatsWidget` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StatsWidget` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecentUser" DROP CONSTRAINT "RecentUser_statsWidgetId_fkey";

-- DropIndex
DROP INDEX "RecentUser_email_key";

-- AlterTable
ALTER TABLE "RecentUser" DROP CONSTRAINT "RecentUser_pkey",
DROP COLUMN "earnedAmount",
DROP COLUMN "statsWidgetId",
ADD COLUMN     "widgetId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "RecentUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RecentUser_id_seq";

-- AlterTable
ALTER TABLE "StatsWidget" DROP CONSTRAINT "StatsWidget_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "totalEarned" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "StatsWidget_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StatsWidget_id_seq";

-- CreateTable
CREATE TABLE "StatEarning" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "widgetId" TEXT,

    CONSTRAINT "StatEarning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserEarning" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "recentUserId" TEXT NOT NULL,

    CONSTRAINT "UserEarning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatEarning" ADD CONSTRAINT "StatEarning_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "StatsWidget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentUser" ADD CONSTRAINT "RecentUser_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "StatsWidget"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEarning" ADD CONSTRAINT "UserEarning_recentUserId_fkey" FOREIGN KEY ("recentUserId") REFERENCES "RecentUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
