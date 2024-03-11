-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "seasons" ALTER COLUMN "constructors_champion" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
