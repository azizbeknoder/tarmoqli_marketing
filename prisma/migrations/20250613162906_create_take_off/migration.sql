-- CreateEnum
CREATE TYPE "TakeOffStatus" AS ENUM ('PENDING', 'CANCELLED', 'SUCCESS', 'SENDING', 'SCRINSHOTUPLOAD', 'CANCELLEDADMIN');

-- CreateTable
CREATE TABLE "TakeOff" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "how_much" INTEGER NOT NULL,
    "status" "TakeOffStatus" NOT NULL DEFAULT 'PENDING',
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkedDate" TIMESTAMP(3),

    CONSTRAINT "TakeOff_pkey" PRIMARY KEY ("id")
);
