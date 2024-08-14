/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_userId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `userId`,
    ADD COLUMN `state` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `user`;
