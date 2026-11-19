CREATE TABLE `lecturers` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`user_id` int NOT NULL,
	`full_name` varchar(150) NOT NULL,
	`nidn` varchar(10) NOT NULL,
	`avatar` varchar(500),
	CONSTRAINT `user_id_unique` UNIQUE INDEX(`user_id`),
	CONSTRAINT `nidn_unique` UNIQUE INDEX(`nidn`),
	CONSTRAINT `lecturers_user_id_users_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `nidn_format_check` CHECK(`lecturers`.`nidn` REGEXP '^[0-9]{10}$')
);
