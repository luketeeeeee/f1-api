/*
  Warnings:

  - Added the required column `race_number` to the `races` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "races" ADD COLUMN     "race_number" INTEGER NOT NULL;
