-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 18, 2018 at 07:05 AM
-- Server version: 5.7.21
-- PHP Version: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ci-chat-socket`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `power` tinyint(1) NOT NULL DEFAULT '1',
  `cc` int(11) NOT NULL DEFAULT '0',
  `dob` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `gender`, `power`, `cc`, `dob`, `created_at`) VALUES
(1, 'buzz4rd', 'kopa@kopa.com', '$2a$10$ggVwZk/R6yYarFdzK8u2X.aaewLuE6fwD.c4Q8RhBg4HKS7ZkmFl6', NULL, 1, 0, '2018-10-16 07:15:09', '2018-10-16 07:15:09'),
(2, 'tizen', 'buzzard351@gmail.com', '$2y$10$xsvM0qbBwguEoff9nD.sGOA/qPPV4zMRdrQbwxijQtaNTmeLBRAbq', NULL, 1, 0, '2018-10-17 06:55:33', '0000-00-00 00:00:00'),
(3, 'yaan', 'buzzard352@gmail.com', '$2y$10$xsvM0qbBwguEoff9nD.sGOA/qPPV4zMRdrQbwxijQtaNTmeLBRAbq', NULL, 1, 0, '2018-10-17 06:55:33', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
