-- DropForeignKey
ALTER TABLE "RecentUser" DROP CONSTRAINT "RecentUser_widgetId_fkey";

-- DropForeignKey
ALTER TABLE "StatEarning" DROP CONSTRAINT "StatEarning_widgetId_fkey";

-- DropForeignKey
ALTER TABLE "UserEarning" DROP CONSTRAINT "UserEarning_recentUserId_fkey";

-- AddForeignKey
ALTER TABLE "StatEarning" ADD CONSTRAINT "StatEarning_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "StatsWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecentUser" ADD CONSTRAINT "RecentUser_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "StatsWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEarning" ADD CONSTRAINT "UserEarning_recentUserId_fkey" FOREIGN KEY ("recentUserId") REFERENCES "RecentUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
