ALTER TABLE `users` ADD `email` varchar(255) NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `email_unique` ON `users` (`email`);