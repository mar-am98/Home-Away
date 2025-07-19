-- CreateTable
CREATE TABLE "tst" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "tst_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tst_email_key" ON "tst"("email");
