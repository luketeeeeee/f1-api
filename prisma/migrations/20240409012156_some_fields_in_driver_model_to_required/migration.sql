/*
  Warnings:

  - Made the column `nationality` on table `drivers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_competing_in_f1` on table `drivers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_alive` on table `drivers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "drivers" ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "is_competing_in_f1" SET NOT NULL,
ALTER COLUMN "is_alive" SET NOT NULL;
