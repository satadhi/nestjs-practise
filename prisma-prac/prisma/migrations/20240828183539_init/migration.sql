/*
  Warnings:

  - Added the required column `role` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Owner` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL;
