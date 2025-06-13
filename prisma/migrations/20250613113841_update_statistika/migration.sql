/*
  Warnings:

  - The primary key for the `RecentUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `widgetId` on the `RecentUser` table. All the data in the column will be lost.
  - The `id` column on the `RecentUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `StatEarning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Statistika` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StatsWidget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEarning` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `RecentUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coin` to the `RecentUser` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `RecentUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RecentUser" DROP CONSTRAINT "RecentUser_widgetId_fkey";

-- DropForeignKey
ALTER TABLE "StatEarning" DROP CONSTRAINT "StatEarning_widgetId_fkey";

-- DropForeignKey
ALTER TABLE "UserEarning" DROP CONSTRAINT "UserEarning_recentUserId_fkey";

-- AlterTable
ALTER TABLE "RecentUser" DROP CONSTRAINT "RecentUser_pkey",
DROP COLUMN "widgetId",
ADD COLUMN     "coin" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "RecentUser_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "StatEarning";

-- DropTable
DROP TABLE "Statistika";

-- DropTable
DROP TABLE "StatsWidget";

-- DropTable
DROP TABLE "UserEarning";

-- CreateTable
CREATE TABLE "StatistikaWeb" (
    "id" SERIAL NOT NULL,
    "userCount" INTEGER NOT NULL,
    "allCoin" INTEGER NOT NULL,

    CONSTRAINT "StatistikaWeb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecentUser_email_key" ON "RecentUser"("email");
