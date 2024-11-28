/*
  Warnings:

  - Added the required column `precio` to the `Plato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `plato` ADD COLUMN `precio` DOUBLE NOT NULL;
