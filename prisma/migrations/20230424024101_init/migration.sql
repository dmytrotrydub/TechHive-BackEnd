/*
  Warnings:

  - Added the required column `title` to the `Professional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Professional` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Professional` ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `token` VARCHAR(500) NOT NULL;
