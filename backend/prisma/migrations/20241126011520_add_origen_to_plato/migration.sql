/*
  Warnings:

  - Added the required column `origen` to the `Plato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plato` ADD COLUMN `origen` VARCHAR(191) NOT NULL;
