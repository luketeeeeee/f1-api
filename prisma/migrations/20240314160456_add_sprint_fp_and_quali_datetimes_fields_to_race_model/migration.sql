/*
  Warnings:

  - You are about to drop the column `datetime` on the `races` table. All the data in the column will be lost.
  - Added the required column `race_datetime` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "races" DROP COLUMN "datetime",
ADD COLUMN     "fp1_datetime" TIMESTAMP(3),
ADD COLUMN     "fp2_datetime" TIMESTAMP(3),
ADD COLUMN     "fp3_datetime" TIMESTAMP(3),
ADD COLUMN     "quali_datetime" TIMESTAMP(3),
ADD COLUMN     "race_datetime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sprint_datetime" TIMESTAMP(3);
