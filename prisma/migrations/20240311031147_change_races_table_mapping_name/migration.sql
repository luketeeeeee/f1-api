/*
  Warnings:

  - You are about to drop the `Race` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Race" DROP CONSTRAINT "Race_seasonId_fkey";

-- DropTable
DROP TABLE "Race";

-- CreateTable
CREATE TABLE "races" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "winner" TEXT,
    "circuit" TEXT NOT NULL,
    "seasonId" TEXT,

    CONSTRAINT "races_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "races" ADD CONSTRAINT "races_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
