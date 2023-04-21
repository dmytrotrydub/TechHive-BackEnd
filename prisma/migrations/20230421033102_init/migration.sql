/*
  Warnings:

  - Made the column `token` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `token` VARCHAR(500) NOT NULL;
