-- CreateTable
CREATE TABLE "StatsWidget" (
    "id" SERIAL NOT NULL,
    "onlineUserCount" INTEGER NOT NULL,
    "totalEarned" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatsWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecentUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "earnedAmount" DECIMAL(10,2) NOT NULL,
    "statsWidgetId" INTEGER NOT NULL,

    CONSTRAINT "RecentUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecentUser" ADD CONSTRAINT "RecentUser_statsWidgetId_fkey" FOREIGN KEY ("statsWidgetId") REFERENCES "StatsWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
