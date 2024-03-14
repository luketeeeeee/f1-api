/*
  Warnings:

  - You are about to drop the column `seasonId` on the `races` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "races" DROP CONSTRAINT "races_seasonId_fkey";

-- AlterTable
ALTER TABLE "races" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" TEXT;

-- AddForeignKey
ALTER TABLE "races" ADD CONSTRAINT "races_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "seasons"("year") ON DELETE SET NULL ON UPDATE CASCADE;
