CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50),
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('bettor','bookmaker','admin') NOT NULL DEFAULT 'bettor',
	`refreshToken` varchar(255),
	`lastSignInAt` datetime,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime,
	`deletedAt` datetime,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
