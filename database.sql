Drop DATABASE IF EXISTS `school-portal`;
GRANT USAGE ON *.* TO 'schoolportal'@'localhost';
DROP USER 'schoolportal'@'localhost';

CREATE DATABASE `school-portal`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

CREATE USER 'schoolportal'@'localhost' IDENTIFIED BY 'schoolportal';
GRANT CREATE, DROP, DELETE, INSERT, SELECT, UPDATE ON `school-portal`.* TO 'schoolportal'@'localhost';

USE `school-portal`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailUnique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` int(11) unsigned NOT NULL,
  `role_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;






INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`)
VALUES
	(1,'Kazimierz','Maciaszek','kazimierz.maciaszek@gmail.com','2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b'),
	(2,'Mateusz','Zembol','mateusz.zembol@gmail.com','2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b'),
	(4,'Iwona','Maciaszek','iwona.klysz@gmail.com','2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b');



INSERT INTO `role` (`id`, `name`)
VALUES
	(1,'Admin'),
	(2,'Teacher');


INSERT INTO `user_role` (`user_id`, `role_id`)
VALUES
	(1,1),
	(2,1),
	(4,2);