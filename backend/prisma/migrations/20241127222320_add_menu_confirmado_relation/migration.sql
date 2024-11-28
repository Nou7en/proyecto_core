-- AlterTable
ALTER TABLE `plato` ADD COLUMN `menuConfirmadoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `MenuConfirmado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `confirmedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Plato` ADD CONSTRAINT `Plato_menuConfirmadoId_fkey` FOREIGN KEY (`menuConfirmadoId`) REFERENCES `MenuConfirmado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuConfirmado` ADD CONSTRAINT `MenuConfirmado_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
