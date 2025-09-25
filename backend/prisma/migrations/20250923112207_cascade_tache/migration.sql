-- DropForeignKey
ALTER TABLE `Historique` DROP FOREIGN KEY `Historique_tacheId_fkey`;

-- DropForeignKey
ALTER TABLE `Historique` DROP FOREIGN KEY `Historique_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_tacheId_fkey`;

-- DropForeignKey
ALTER TABLE `Permission` DROP FOREIGN KEY `Permission_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tache` DROP FOREIGN KEY `Tache_userId_fkey`;

-- DropIndex
DROP INDEX `Historique_tacheId_fkey` ON `Historique`;

-- DropIndex
DROP INDEX `Historique_userId_fkey` ON `Historique`;

-- DropIndex
DROP INDEX `Permission_tacheId_fkey` ON `Permission`;

-- DropIndex
DROP INDEX `Tache_userId_fkey` ON `Tache`;

-- AddForeignKey
ALTER TABLE `Tache` ADD CONSTRAINT `Tache_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historique` ADD CONSTRAINT `Historique_tacheId_fkey` FOREIGN KEY (`tacheId`) REFERENCES `Tache`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Historique` ADD CONSTRAINT `Historique_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_tacheId_fkey` FOREIGN KEY (`tacheId`) REFERENCES `Tache`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
