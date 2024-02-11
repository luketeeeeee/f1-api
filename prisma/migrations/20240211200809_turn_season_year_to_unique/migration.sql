/*
  Warnings:

  - You are about to drop the column `seasonId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `teams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[year]` on the table `seasons` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_seasonId_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" TEXT;

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" TEXT;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "seasons_year_key" ON "seasons"("year");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "seasons"("year") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "seasons"("year") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "seasons"("year") ON DELETE SET NULL ON UPDATE CASCADE;
