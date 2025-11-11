CREATE TABLE `chatMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`orderType` enum('buy','sell') NOT NULL,
	`itemType` enum('adena','item','account') NOT NULL,
	`server` varchar(100) NOT NULL,
	`adenaQuantity` int,
	`itemName` varchar(255),
	`itemDescription` text,
	`accountDescription` text,
	`price` decimal(10,2) NOT NULL,
	`status` enum('active','completed','cancelled') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`reviewerId` int NOT NULL,
	`revieweeId` int NOT NULL,
	`rating` enum('positive','negative') NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tokenTransactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`amount` int NOT NULL,
	`reason` varchar(255) NOT NULL,
	`orderId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tokenTransactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `userId` varchar(6);--> statement-breakpoint
ALTER TABLE `users` ADD `country` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `nickname` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `tokens` int DEFAULT 10 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `totalTrades` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `positiveReviews` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `negativeReviews` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `trustIndex` decimal(5,2) DEFAULT '100.00' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_userId_unique` UNIQUE(`userId`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_nickname_unique` UNIQUE(`nickname`);