SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
SET NAMES utf8mb4;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` varchar(36) NOT NULL COMMENT 'UUID v4',
    `username` varchar(50),
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `role` ENUM('bettor', 'bookmaker', 'admin') NOT NULL DEFAULT 'bettor',
    `refreshToken` varchar(255) DEFAULT NULL,
    `lastSignInAt` datetime DEFAULT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_uca1400_ai_ci;