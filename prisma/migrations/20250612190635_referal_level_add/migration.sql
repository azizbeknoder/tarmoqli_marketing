-- CreateTable
CREATE TABLE "ReferalLevel" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL,
    "prize" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ReferalLevel_pkey" PRIMARY KEY ("id")
);
