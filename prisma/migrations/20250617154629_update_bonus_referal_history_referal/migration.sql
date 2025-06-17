-- CreateTable
CREATE TABLE "BonusReferalHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "referalUserId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coin" INTEGER NOT NULL,

    CONSTRAINT "BonusReferalHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BonusReferalHistory" ADD CONSTRAINT "BonusReferalHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusReferalHistory" ADD CONSTRAINT "BonusReferalHistory_referalUserId_fkey" FOREIGN KEY ("referalUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
