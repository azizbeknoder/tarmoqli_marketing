-- CreateTable
CREATE TABLE "Statistika" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "coin" INTEGER NOT NULL,

    CONSTRAINT "Statistika_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Statistika_email_key" ON "Statistika"("email");
