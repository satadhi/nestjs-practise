-- AlterTable
ALTER TABLE `Product` ADD COLUMN `userId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'CAT', 'DOG') NOT NULL,

    UNIQUE INDEX `Owner_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Owner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
