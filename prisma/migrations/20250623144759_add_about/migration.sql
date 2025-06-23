-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutTranslation" (
    "id" SERIAL NOT NULL,
    "aboutId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "heroTitle" TEXT NOT NULL,
    "heroDescription" TEXT NOT NULL,
    "howWorkSystem" TEXT NOT NULL,
    "withPlansTitle" TEXT NOT NULL,
    "withPlansDescription" TEXT NOT NULL,
    "referalTitle" TEXT NOT NULL,
    "referalDescription" TEXT NOT NULL,
    "levelTitle" TEXT NOT NULL,
    "levelDescription" TEXT NOT NULL,
    "USDTTitle" TEXT NOT NULL,
    "USDTDescription" TEXT NOT NULL,

    CONSTRAINT "AboutTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AboutTranslation" ADD CONSTRAINT "AboutTranslation_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;
