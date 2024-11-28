-- DropForeignKey
ALTER TABLE `plato` DROP FOREIGN KEY `Plato_menuId_fkey`;

-- AlterTable
ALTER TABLE `plato` MODIFY `menuId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Plato` ADD CONSTRAINT `Plato_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
