-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 30, 2017 at 10:46 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teacherportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `booked_time`
--

CREATE TABLE `booked_time` (
  `booked_time_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `user_category_join_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `booked_time`
--

INSERT INTO `booked_time` (`booked_time_id`, `active`, `end_date`, `start_date`, `student_id`, `user_category_join_id`, `order_id`) VALUES
(1, b'1', '2017-03-20 19:00:00', '2017-03-20 18:00:00', 2, 1, NULL),
(2, b'1', '2017-03-20 19:30:00', '2017-03-20 19:10:00', 2, 1, NULL),
(3, b'0', '2017-03-20 13:00:12', '2017-03-20 12:00:12', 2, 1, 1),
(4, b'0', '2017-03-22 13:00:12', '2017-03-22 12:00:12', 2, 1, 1),
(5, b'0', '2017-03-29 11:00:12', '2017-03-29 10:00:12', 2, 1, 1),
(6, b'0', '2017-03-18 09:40:06', '2017-03-18 09:00:06', 2, 2, 2),
(7, b'0', '2017-03-20 13:40:06', '2017-03-20 13:00:06', 2, 2, 2),
(8, b'0', '2017-03-25 10:20:06', '2017-03-25 09:40:06', 2, 2, 2),
(9, b'0', '2017-03-29 10:00:14', '2017-03-29 09:00:14', 2, 1, 3),
(10, b'0', '2017-03-29 19:50:14', '2017-03-29 18:50:14', 2, 1, 3),
(11, b'0', '2017-03-29 13:00:23', '2017-03-29 12:00:23', 2, 1, 4),
(12, b'0', '2017-04-03 13:00:23', '2017-04-03 12:00:23', 2, 1, 4),
(13, b'0', '2017-03-29 19:50:16', '2017-03-29 18:50:16', 2, 1, 5),
(14, b'0', '2017-03-29 20:50:16', '2017-03-29 19:50:16', 2, 1, 5),
(15, b'0', '2017-03-30 14:00:26', '2017-03-30 13:00:26', 2, 1, 6),
(16, b'0', '2017-03-30 16:00:14', '2017-03-30 15:00:14', 2, 1, 7),
(17, b'0', '2017-03-30 18:00:12', '2017-03-30 17:00:12', 2, 1, 8),
(18, b'0', '2017-04-06 12:00:16', '2017-04-06 11:00:16', 2, 1, 9),
(19, b'0', '2017-04-06 14:00:38', '2017-04-06 13:00:00', 2, 1, 10),
(20, b'0', '2017-04-06 15:00:36', '2017-04-06 14:00:00', 2, 1, 11),
(21, b'0', '2017-03-30 19:00:48', '2017-03-30 18:00:00', 2, 1, 12),
(22, b'0', '2017-04-05 10:00:00', '2017-04-05 09:00:00', 2, 1, 13),
(23, b'0', '2017-03-27 18:00:00', '2017-03-27 17:00:00', 2, 1, 14),
(24, b'0', '2017-03-27 19:00:00', '2017-03-27 18:00:00', 2, 1, 15),
(25, b'0', '2017-04-06 17:00:00', '2017-04-06 16:00:00', 2, 1, 16),
(26, b'0', '2017-04-01 10:20:00', '2017-04-01 09:40:00', 2, 2, 17),
(27, b'0', '2017-04-01 18:05:00', '2017-04-01 17:25:00', 2, 2, 17),
(28, b'0', '2017-04-03 14:40:00', '2017-04-03 14:00:00', 2, 2, 17),
(29, b'0', '2017-04-08 12:20:00', '2017-04-08 11:40:00', 2, 2, 17),
(30, b'0', '2017-04-10 13:20:00', '2017-04-10 12:40:00', 2, 2, 17),
(31, b'0', '2017-04-15 12:20:00', '2017-04-15 11:40:00', 2, 2, 17),
(32, b'0', '2017-03-29 12:00:00', '2017-03-29 11:00:00', 2, 1, 18),
(33, b'0', '2017-03-30 15:00:00', '2017-03-30 14:00:00', 2, 1, 18),
(34, b'0', '2017-04-05 11:00:00', '2017-04-05 10:00:00', 2, 1, 18),
(35, b'0', '2017-04-06 18:00:00', '2017-04-06 17:00:00', 2, 1, 18),
(36, b'0', '2017-03-27 13:00:00', '2017-03-27 12:00:00', 2, 1, 19),
(37, b'0', '2017-03-27 14:00:00', '2017-03-27 13:00:00', 2, 1, 19),
(38, b'1', '2017-03-29 19:50:00', '2017-03-29 18:50:00', 2, 1, 20),
(39, b'1', '2017-03-29 21:50:00', '2017-03-29 20:50:00', 2, 1, 20),
(40, b'1', '2017-03-29 22:50:00', '2017-03-29 21:50:00', 2, 1, 20),
(41, b'1', '2017-03-30 15:00:00', '2017-03-30 14:00:00', 2, 1, 20),
(42, b'1', '2017-03-30 18:00:00', '2017-03-30 17:00:00', 2, 1, 20),
(43, b'1', '2017-03-30 19:00:00', '2017-03-30 18:00:00', 2, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `visible` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `active`, `date`, `logo`, `name`, `uuid`, `visible`) VALUES
(1, b'1', '2017-03-14 22:22:58', NULL, 'Math', '09d73849-2281-46ba-aa67-f5bda5f7eb5b', b'0'),
(2, b'1', '2017-03-16 20:18:41', NULL, 'Art', '1182e3d1-8c60-4425-ab61-895d7d16378d', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `category_doctype`
--

CREATE TABLE `category_doctype` (
  `category_category_id` bigint(20) DEFAULT NULL,
  `doc_types_doc_type_id` bigint(20) DEFAULT NULL,
  `doc_type_doc_type_id` bigint(20) DEFAULT NULL,
  `categories_category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category_doctype`
--

INSERT INTO `category_doctype` (`category_category_id`, `doc_types_doc_type_id`, `doc_type_doc_type_id`, `categories_category_id`) VALUES
(1, 1, NULL, NULL),
(1, 2, NULL, NULL),
(2, 1, NULL, NULL),
(2, 2, NULL, NULL),
(2, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `name`, `country_id`) VALUES
(1, 'Tbilis', 1);

-- --------------------------------------------------------

--
-- Table structure for table `confirmation_token`
--

CREATE TABLE `confirmation_token` (
  `token_id` bigint(20) NOT NULL,
  `confimed` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `name`) VALUES
(1, 'Georgia');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `doc_type_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `join_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`document_id`, `active`, `date`, `extension`, `file_name`, `name`, `doc_type_id`, `user_id`, `join_id`) VALUES
(1, b'1', '2017-03-15 22:53:14', 'application/zip', 'ce0e0be8-0dda-4eaa-803e-c4de02230da6', 'About Downloads.lpdf.zip', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `doc_type`
--

CREATE TABLE `doc_type` (
  `doc_type_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `doc_type`
--

INSERT INTO `doc_type` (`doc_type_id`, `active`, `date`, `name`, `uuid`) VALUES
(1, b'1', '2017-03-14 22:23:07', 'ID', '63e19291-571f-48ca-ae99-a90192c51c20'),
(2, b'1', '2017-03-14 22:23:14', 'Diploma', '277ffc67-8d4a-4e5a-921a-e3b8c5e2e889'),
(3, b'1', '2017-03-16 20:21:26', 'prava', '5edacaef-bf54-428a-b3f4-d0f74960ca89');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_picture`
--

CREATE TABLE `gallery_picture` (
  `gallery_picture_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `confirmed` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `refunded` bit(1) DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `active`, `confirm_date`, `confirmed`, `create_date`, `last_modify_date`, `refunded`, `uuid`, `user_id`, `price`) VALUES
(1, b'0', NULL, b'0', '2017-03-16 20:17:56', '2017-03-26 12:24:14', b'0', '38ffa1c6-542a-4877-8816-d2c510d41996', 2, 60),
(2, b'0', NULL, b'0', '2017-03-16 20:26:17', '2017-03-26 12:24:14', b'0', '09a69a7b-41bd-401d-88f2-0f8867f418d1', 2, 120),
(3, b'0', NULL, b'0', '2017-03-23 00:44:27', '2017-03-26 12:24:14', b'0', '2c866036-671f-4574-b15c-b1e67e5c9539', 2, 40),
(4, b'0', NULL, b'0', '2017-03-23 01:06:15', '2017-03-26 12:24:14', b'0', 'ca7fef5a-2e6e-4511-9df2-3f8eee64c444', 2, 40),
(5, b'0', NULL, b'0', '2017-03-23 22:16:25', '2017-03-26 12:24:14', b'0', 'f063a6c7-e916-4343-a2d3-d6e7735f6bde', 2, 40),
(6, b'0', NULL, b'0', '2017-03-23 23:22:36', '2017-03-26 12:24:14', b'0', '2d8e696a-b986-4e17-a793-db87f3acb17a', 2, 20),
(7, b'0', NULL, b'0', '2017-03-23 23:24:24', '2017-03-26 12:24:14', b'0', '7337e7a5-e03c-44bd-8f63-2b10cad6a254', 2, 20),
(8, b'0', NULL, b'0', '2017-03-23 23:25:59', '2017-03-26 12:24:14', b'0', '38f5cb78-d6cc-43d1-a761-97f6cc4bd8a0', 2, 20),
(9, b'0', NULL, b'0', '2017-03-23 23:26:52', '2017-03-26 12:24:14', b'0', 'd7de2471-78b2-4968-988e-a88336d39df5', 2, 20),
(10, b'0', NULL, b'0', '2017-03-23 23:29:52', '2017-03-26 12:24:14', b'0', 'e598dbe7-3899-407d-bbd7-ad631f7dc4e3', 2, 20),
(11, b'0', NULL, b'0', '2017-03-23 23:30:54', '2017-03-26 12:24:14', b'0', '0c94a050-ecd8-470c-a476-cadd37e33a58', 2, 20),
(12, b'0', NULL, b'0', '2017-03-23 23:34:00', '2017-03-26 12:24:14', b'0', '8a1a56b1-ceca-41ec-9ef2-afbbb2ec3d01', 2, 20),
(13, b'0', NULL, b'0', '2017-03-23 23:38:14', '2017-03-26 12:24:14', b'0', '6f28893e-3249-4d09-b5c3-fba61b1717b8', 2, 20),
(14, b'0', NULL, b'0', '2017-03-23 23:46:07', '2017-03-26 12:24:14', b'0', 'b786dd29-422c-4e4b-9672-238cc147cfd0', 2, 20),
(15, b'0', NULL, b'0', '2017-03-23 23:55:17', '2017-03-26 12:24:14', b'0', 'c5d13d16-05bf-44a0-add4-0dfe83420269', 2, 20),
(16, b'0', NULL, b'0', '2017-03-26 01:34:09', '2017-03-26 12:24:14', b'0', '6426247d-fbc0-4e9f-bb6d-a07bbfc3f24e', 2, 20),
(17, b'0', NULL, b'0', '2017-03-26 01:55:17', '2017-03-26 12:24:14', b'0', '597a8aa6-cfd9-49fe-a2cd-7b68e37f01d5', 2, 240),
(18, b'0', NULL, b'0', '2017-03-26 14:00:22', '2017-03-26 16:22:31', b'0', '00fdde0b-54a8-431d-baa0-df4cb5c864ac', 2, 80),
(19, b'0', NULL, b'0', '2017-03-26 23:16:38', '2017-03-26 23:31:39', b'0', '109bac85-e908-443f-b43a-9c22f7bedfa2', 2, 40),
(20, b'1', NULL, b'0', '2017-03-29 15:40:07', '2017-03-29 15:40:07', b'0', 'aaa211a2-ac1e-4e33-a514-58623fb0c344', 2, 120);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `confirmed` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `price` float DEFAULT NULL,
  `transaction` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `confirmed`, `date`, `price`, `transaction`, `uuid`, `active`, `confirm_date`, `order_id`) VALUES
(1, b'0', '2017-03-16 20:17:56', 60, NULL, '7e4dfd62-435f-4a1c-8281-0305381c7919', b'1', NULL, 1),
(2, b'0', '2017-03-16 20:26:17', 120, NULL, 'a50176a7-1827-4fd3-ad0a-bf861e7c3629', b'1', NULL, 2),
(3, b'0', '2017-03-23 00:44:27', 40, NULL, '766ee48e-1d8f-4c0b-8fce-694606a9a979', b'1', NULL, 3),
(4, b'0', '2017-03-23 01:06:15', 40, NULL, '203bd33b-b66c-4f8d-943c-36089118a4a6', b'1', NULL, 4),
(5, b'0', '2017-03-23 22:16:26', 40, NULL, 'f92741eb-c016-4b1b-9c3a-ca2b94ac9a45', b'1', NULL, 5),
(6, b'0', '2017-03-23 23:22:36', 20, NULL, '39fe0247-e7b2-4c02-95e5-17227dc074e1', b'1', NULL, 6),
(7, b'0', '2017-03-23 23:24:24', 20, NULL, '8496fc99-f479-4068-89f9-7dc96150534d', b'1', NULL, 7),
(8, b'0', '2017-03-23 23:25:59', 20, NULL, 'df6f325b-25f6-4790-b37f-fff13778ec8c', b'1', NULL, 8),
(9, b'0', '2017-03-23 23:26:52', 20, NULL, 'a395e4d0-d732-492b-8285-433d1780259a', b'1', NULL, 9),
(10, b'0', '2017-03-23 23:29:52', 20, NULL, '5f606f97-d60a-46c8-b68b-431dadc3f3e1', b'1', NULL, 10),
(11, b'0', '2017-03-23 23:30:54', 20, NULL, '0869a19b-53cc-4788-b3ca-81ebd4be4652', b'1', NULL, 11),
(12, b'0', '2017-03-23 23:34:00', 20, NULL, 'd84d932c-1ddc-446a-bb4c-f75173aa2e11', b'1', NULL, 12),
(13, b'0', '2017-03-23 23:38:14', 20, NULL, '40d14913-f0ce-40aa-ac44-910660b6f120', b'1', NULL, 13),
(14, b'0', '2017-03-23 23:46:07', 20, NULL, '7168d258-94fc-42b4-a9ce-f5423e533972', b'1', NULL, 14),
(15, b'0', '2017-03-23 23:55:17', 20, NULL, '4e51b3c1-50fb-4779-85e3-d58bdac51f99', b'1', NULL, 15),
(16, b'0', '2017-03-26 01:34:09', 20, NULL, '14b257f1-dd02-415d-bffd-4e4227e35c9d', b'1', NULL, 16),
(17, b'0', '2017-03-26 01:55:17', 240, NULL, 'f29c3a90-8c2d-4917-8cdf-755cf1e06f5f', b'1', NULL, 17),
(18, b'0', '2017-03-26 14:00:22', 80, NULL, '04c2c5f9-40d1-4410-859d-888acf8d1361', b'1', NULL, 18),
(19, b'0', '2017-03-26 23:16:38', 40, NULL, '6ad1ddf8-161e-4f7e-a614-6487e6eac77c', b'1', NULL, 19),
(20, b'0', '2017-03-29 15:40:07', 120, NULL, '0d50a764-f49e-40ba-91f4-450f39845b64', b'1', NULL, 20);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `permission_id` bigint(20) NOT NULL,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`permission_id`, `code`, `name`) VALUES
(1, 'categoryConfirmation', 'categoryConfirmation'),
(2, 'users', 'users'),
(3, 'payments', 'payments'),
(4, 'dashboard', 'dashboard'),
(5, 'test', 'test'),
(6, 'teacher', 'teacher'),
(7, 'student', 'student'),
(8, 'admin', 'admin'),
(9, 'fileManagement', 'fileManagement'),
(10, 'categories', 'categories'),
(11, 'docTypes', 'docTypes'),
(12, 'gallery', 'gallery'),
(13, 'scheduling', 'scheduling'),
(14, 'orders', 'Orders'),
(15, 'strings', 'App Strings');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `day_of_week` int(11) DEFAULT NULL,
  `user_category_join_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `active`, `day_of_week`, `user_category_join_id`) VALUES
(1, b'1', 0, 1),
(2, b'1', 2, 1),
(3, b'1', 5, 1),
(4, b'1', 0, 2),
(5, b'1', 5, 2),
(6, b'1', 1, 1),
(7, b'1', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule_time`
--

CREATE TABLE `schedule_time` (
  `schedule_time_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `schedule_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule_time`
--

INSERT INTO `schedule_time` (`schedule_time_id`, `active`, `end_time`, `start_time`, `schedule_id`) VALUES
(1, b'1', '14:30:36', '12:00:36', 1),
(2, b'1', '20:00:31', '17:00:31', 1),
(3, b'1', '22:55:21', '18:50:21', 2),
(4, b'1', '14:30:35', '09:00:35', 2),
(5, b'1', '16:00:14', '12:00:14', 4),
(6, b'1', '14:00:09', '09:00:09', 5),
(7, b'1', '19:25:51', '17:25:51', 5),
(8, b'1', '19:30:58', '10:00:58', 7);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` bigint(20) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `create_date`, `isactive`, `user_id`) VALUES
(1, '2017-03-14 22:17:28', b'1', 1),
(2, '2017-03-14 22:29:42', b'0', 1),
(3, '2017-03-21 01:13:02', b'0', 1),
(4, '2017-03-21 01:14:04', b'1', 1),
(5, '2017-03-21 01:14:37', b'1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sys_strings`
--

CREATE TABLE `sys_strings` (
  `string_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sys_strings`
--

INSERT INTO `sys_strings` (`string_id`, `active`, `create_date`, `name`, `uuid`, `value`) VALUES
(1, b'1', '2017-03-26 22:48:35', 'admin_header', '8b3e2963-f0b4-4d0d-903f-1db1899f6e6f', 'Management System'),
(2, b'1', '2017-03-26 22:48:54', 'admin_search_filed_value', '279f4a35-372d-48ee-b822-ccf8c56a5335', 'Search...'),
(3, b'1', '2017-03-26 22:49:25', 'admin_menu_users', '5ef155e3-5c16-43c8-845f-43bdeb541f98', 'Users'),
(4, b'1', '2017-03-26 22:50:39', 'admin_menu_dashboard', '41b33009-fbee-498f-85d5-1822a43b3a0c', 'Dashboard'),
(5, b'1', '2017-03-26 22:51:00', 'admin_menu_categories', 'eae2abd1-dbef-41e4-9438-54fe88ef4436', 'Categories'),
(6, b'1', '2017-03-26 22:51:18', 'admin_menu_orders', 'b92f508f-4552-425c-969d-bac33c30723a', 'Orders'),
(7, b'1', '2017-03-26 22:51:37', 'admin_menu_strings', '0705bf7c-ef18-4cfb-baac-f7c21dee126a', 'Strings'),
(8, b'1', '2017-03-26 22:52:01', 'admin_button_add', '793bde7c-0239-4ae1-ab28-b2f05fe5c20d', 'Add'),
(9, b'1', '2017-03-26 22:52:19', 'admin_header_hello', '98e8614a-77a9-49a3-9b02-e205b66421ea', 'Hello'),
(10, b'1', '2017-03-26 22:52:45', 'admin_button_newuser', 'ad5811e9-e070-488b-86ac-501dc69c8005', 'Add User'),
(11, b'1', '2017-03-26 22:53:47', 'admin_tab_documents', '73dfdd67-5eab-420f-97ba-3e7713afd310', 'Documents'),
(12, b'1', '2017-03-26 22:54:03', 'admin_tab_permissions', '3556a713-64ee-43be-a487-b712b0b33211', 'Permissions'),
(13, b'1', '2017-03-26 22:54:16', 'admin_button_save', '1f4802b4-5f3d-41b8-a27f-289271149373', 'Save'),
(14, b'1', '2017-03-26 22:54:49', 'admin_button_cancele', '13cb2c40-1529-4565-983e-55229b39dd6b', 'Cancele'),
(15, b'1', '2017-03-26 22:55:16', 'admin_tab_classes', '84319993-b22b-4c44-935b-4a220041d5ed', 'Classes'),
(16, b'1', '2017-03-26 22:55:36', 'admin_tab_categories', '43a0668c-e932-478a-bc00-520d476cf284', 'Categories'),
(17, b'1', '2017-03-26 22:56:03', 'admin_tab_actions', '1d49148d-b449-425d-8e2f-25fff8c5b8bd', 'Actions'),
(18, b'1', '2017-03-26 22:56:13', 'admin_tab_info', '406d9deb-f299-4a31-8e32-e8e86f139e8e', 'Info'),
(19, b'1', '2017-03-26 22:56:41', 'admin_button_upload', 'd7975293-6ab5-448f-93dc-e590435e424c', 'Upload'),
(20, b'1', '2017-03-26 22:56:59', 'admin_tab_gallery', '03215fdb-5daf-434d-aa12-bd1c13064565', 'Gallery'),
(21, b'1', '2017-03-26 22:57:36', 'admin_label_user_permissions', '6cd7a064-069d-4553-acb3-fec86b015001', 'User Permissions'),
(22, b'1', '2017-03-26 22:57:54', 'admin_label_permissions_to_add', '47420b53-e112-4b53-94ab-ca09a6b7b2d9', 'Permissions To Add'),
(23, b'1', '2017-03-26 22:58:23', 'admin_button_add_category', '3bb3091a-8aa9-4251-9325-27d8ea1271a4', 'Add Category'),
(24, b'1', '2017-03-26 22:59:11', 'admin_label_category', 'a7aa9331-54b4-43e5-aaf1-8aef023d8c28', 'Category'),
(25, b'1', '2017-03-26 22:59:25', 'admin_label_price', '7ccfc2fd-f1e1-4c92-aece-743c7e8449ca', 'Price'),
(26, b'1', '2017-03-26 22:59:38', 'admin_label_duration', 'fa18b31e-bec3-4e2c-bb9d-a86d5765f25e', 'Duration'),
(27, b'1', '2017-03-26 23:00:53', 'admin_tab_schedule', '0f187908-1429-4045-afc5-b047c98b6201', 'Schedule'),
(28, b'1', '2017-03-26 23:01:13', 'admin_label_day', '4f9c613a-01c8-4694-91e0-510513e83650', 'Day'),
(29, b'1', '2017-03-26 23:01:36', 'admin_label_working_hours', 'be1e6ec0-b86f-4e8f-9876-bcbf5334ea52', 'Working Hours'),
(30, b'1', '2017-03-26 23:15:35', 'admin_button_schedule_lesson', 'e12dee29-7e2f-4019-ad0e-20f7c39be2d4', 'Schedule Lesson'),
(31, b'1', '2017-03-26 23:16:04', 'admin_button_book', 'fa85be1f-1e86-4fcf-8967-3ab370f21bff', 'Book'),
(32, b'1', '2017-03-26 23:17:04', 'admin_button_pay_now', '58b7eb5e-abba-4b47-aaab-e3feb1ecc757', 'Pay Now'),
(33, b'1', '2017-03-26 23:17:18', 'admin_label_name', '1e072b38-750e-463c-b991-e674c2a2699c', 'Name'),
(34, b'1', '2017-03-26 23:17:30', 'admin_label_value', 'bdf17256-7243-4f40-818b-133585c22dd2', 'Value'),
(35, b'1', '2017-03-26 23:17:48', 'admin_label_status', '41c923d3-afb2-4a6b-8ebb-12a920165c7f', 'Status'),
(36, b'1', '2017-03-26 23:18:55', 'admin_label_teacher', '631d3c9e-1904-49a8-9ebf-97db14220c9b', 'Teacher'),
(37, b'1', '2017-03-26 23:19:04', 'admin_label_student', 'e8b05078-819d-49f8-8f70-9633c5c58306', 'Student'),
(38, b'1', '2017-03-26 23:19:23', 'admin_label_ordered_times', 'd02d762b-fdbe-4737-9684-00e0d0770f26', 'Ordered Times'),
(39, b'1', '2017-03-26 23:19:33', 'admin_label_date', 'c6aba998-b87d-44a4-ba01-34595adde4d8', 'Date'),
(40, b'1', '2017-03-26 23:19:42', 'admin_label_from', '83e9bdf4-b122-461f-8a39-6dc0db598ed1', 'From'),
(41, b'1', '2017-03-26 23:19:50', 'admin_label_to', '938b2e9d-a9a4-4eeb-b29a-729a54811228', 'to'),
(42, b'1', '2017-03-26 23:20:12', 'admin_label_paid', '53ae8ec7-f277-44d5-b5ac-79e171a7e1cb', 'Paid'),
(43, b'1', '2017-03-26 23:20:23', 'admin_label_not_paid', 'b73add1c-32e9-4130-a29b-9644883af030', 'Not Paid'),
(44, b'1', '2017-03-26 23:21:16', 'admin_combobox_label_all_categories', 'dbf57077-2103-43d4-af1a-507e2d39dfd2', 'All Categories'),
(45, b'1', '2017-03-26 23:21:27', 'admin_label_all', 'c36a1228-5a66-4841-9c00-6568069c7d81', 'All'),
(46, b'1', '2017-03-26 23:22:13', 'admin_label_contact', '3acfa49c-651c-48ea-954a-1c2b5fc865f4', 'Contact'),
(47, b'1', '2017-03-26 23:22:37', 'admin_label_user_agreement', '91f69521-53aa-4c5b-bf66-d5a34ad23c64', 'User Agreement'),
(48, b'1', '2017-03-26 23:22:49', 'admin_label_about_us', '47e43b0c-3c35-4536-9d07-3e7cda0bcabf', 'About Us'),
(49, b'1', '2017-03-28 22:17:19', 'admin_label_surname', '9d9752d5-b9ed-4539-9bb9-6d8de657a611', 'Surname'),
(50, b'1', '2017-03-28 22:18:34', 'admin_label_username', '34df5470-d35f-4399-90f9-f0e23f3f479c', 'Username'),
(51, b'1', '2017-03-28 22:18:52', 'admin_label_personal_number', '08bd8319-243a-4500-8a65-6b1b22ecd9cf', 'Personal Number'),
(52, b'1', '2017-03-28 22:19:10', 'admin_label_pn', '555ab4bc-c4d8-4260-a51a-fd8041117cc6', 'P/N'),
(53, b'1', '2017-03-28 22:19:48', 'admin_label_phone', '5e2b5088-c584-438d-94dd-d7fcea70a2c0', 'Phone'),
(54, b'1', '2017-03-28 22:19:55', 'admin_label_mobile', '908b2a18-8dd4-457f-a433-8de2d19682c5', 'Mobile'),
(55, b'1', '2017-03-28 22:21:30', 'admin_label_action', 'e1001d29-d6f0-452a-a2fd-6ec448d09910', 'Action'),
(56, b'1', '2017-03-28 22:23:48', 'admin_button_doctypes', 'e6fde1c4-b4bc-4f29-885d-2181963661b4', 'Document Types'),
(57, b'1', '2017-03-28 22:24:38', 'admin_button_add_new_doc_type', '217994cf-f636-4883-a2a9-456cd763775f', 'Add New Document Type'),
(58, b'1', '2017-03-28 22:26:30', 'admin_label_document_types', 'b72ec675-7f43-43c8-bcaf-14f5599c1248', 'Document Types'),
(59, b'1', '2017-03-28 22:29:39', 'admin_label_required_document_types', '12e17c4a-404f-486e-8764-bdc75e58a244', 'Required Document Types'),
(60, b'1', '2017-03-28 22:30:43', 'admin_label_types_to_add', '3c902a04-058c-44ba-bd5d-95ae26ec475c', 'Types To Add'),
(61, b'1', '2017-03-28 22:33:46', 'admin_label_start_time', 'd252751c-d981-40a1-b2b6-e8bed0315806', 'Start Time'),
(62, b'1', '2017-03-28 22:33:59', 'admin_label_end_time', '809e631a-8b04-426f-a031-4f6e84541b01', 'End Time'),
(63, b'1', '2017-03-28 22:35:32', 'admin_button_book_lesson', '7aca3b17-27ca-4320-a6cb-f26847d5fbb3', 'Book Lesson'),
(64, b'1', '2017-03-28 22:38:40', 'admin_tab_scheduled_lessons', '1a24d5da-d12a-49f3-ab61-6a739083f490', 'Scheduled Lessons'),
(65, b'1', '2017-03-28 22:41:14', 'admin_label_weekday', '963e5274-2c78-4cac-a3f7-9342ab1daabe', 'Weekday'),
(66, b'1', '2017-03-29 00:10:22', 'admin_label_sum', '6e2659df-e303-4c8b-b510-4acbbcd3db1f', 'Sum'),
(67, b'1', '2017-03-29 00:14:51', 'admin_label_work_hours', '413b0e9f-c054-46b3-8ed3-23532212bd5d', 'Work Hours'),
(68, b'1', '2017-03-29 11:48:30', 'admin_label_categories', 'a78eb6c1-55e3-41d4-84f8-c2bb6b7d1553', 'Categories'),
(69, b'1', '2017-03-29 11:49:31', 'admin_label_teacher_pn', 'a0ab9555-3e2b-4cb6-9772-e6cc722d91c2', 'Teacher P.N'),
(70, b'1', '2017-03-29 11:49:45', 'admin_label_student_pn', 'b501eb22-eae3-47d5-9e2a-f76eadb224d7', 'Student P.N'),
(71, b'1', '2017-03-29 11:55:50', 'admin_label_city', '0c69ba74-ca8f-42fe-9ea4-68e3ad157322', 'City'),
(72, b'1', '2017-03-29 11:56:43', 'admin_label_email', '40a7bebb-3eb2-4d28-8c5c-d04b0f3ccd1f', 'Email'),
(73, b'1', '2017-03-29 11:57:23', 'admin_label_password', 'bd83774c-f0cc-4aa3-b471-67b5a6ee05b5', 'Password'),
(74, b'1', '2017-03-29 11:59:21', 'admin_label_address', '97e400d9-cdc4-4074-b16b-3741d48e1a82', 'Address');

-- --------------------------------------------------------

--
-- Table structure for table `sys_string_translations`
--

CREATE TABLE `sys_string_translations` (
  `string_translation_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `lang` int(11) DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `confirmed_email` bit(1) DEFAULT NULL,
  `confirmedsms` bit(1) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `personal_number` varchar(255) COLLATE utf8_bin NOT NULL,
  `profile_pic` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `facebook_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `google_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `calendar_refresh_token` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `calendar_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `address`, `birth_date`, `confirmed_email`, `confirmedsms`, `email`, `mobile`, `name`, `password`, `personal_number`, `profile_pic`, `sex`, `surname`, `type`, `username`, `city_id`, `active`, `facebook_id`, `google_id`, `calendar_refresh_token`, `calendar_id`) VALUES
(1, '1', '1993-08-15 00:00:00', b'1', b'1', 'kaxgel11@gmail.com', '577344094', 'kakha', '1', '01005022890', 'e03c6318-9e09-4b61-aa71-fe2f3b1b2c3e', 1, 'Gelashvili', 1, 'sa', 1, b'1', NULL, '102815771802216742694', '1/igg4dpacvn9pRhIi3KndT47-i0sqwIRK8LZBuOUDx3zqMFlPIoTEPgE9c1D5SZuy', 'kaxgel11@gmail.com'),
(2, 'მიქატაძის 37', '1993-08-15 00:00:00', b'1', b'1', '1', '558226969', 'ნიკა', '1', '01005', NULL, 1, 'გარუჩავა', 1, 'nika', 1, b'1', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_category_join`
--

CREATE TABLE `user_category_join` (
  `join_id` bigint(20) NOT NULL,
  `accepted` bit(1) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `declined` bit(1) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_category_join`
--

INSERT INTO `user_category_join` (`join_id`, `accepted`, `active`, `date`, `declined`, `last_modify_date`, `category_id`, `user_id`, `price`, `duration`) VALUES
(1, b'1', b'1', '2017-03-15 00:43:49', b'0', '2017-03-15 01:38:45', 1, 1, 20, 60),
(2, b'1', b'1', '2017-03-16 20:21:56', b'0', '2017-03-16 20:22:08', 2, 1, 40, 40);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `permission_permission_id` bigint(20) DEFAULT NULL,
  `users_user_id` bigint(20) DEFAULT NULL,
  `user_user_id` bigint(20) DEFAULT NULL,
  `permissions_permission_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`permission_permission_id`, `users_user_id`, `user_user_id`, `permissions_permission_id`) VALUES
(NULL, NULL, 2, 7),
(NULL, NULL, 1, 8),
(NULL, NULL, 1, 2),
(NULL, NULL, 1, 1),
(NULL, NULL, 1, 3),
(NULL, NULL, 1, 4),
(NULL, NULL, 1, 5),
(NULL, NULL, 1, 6),
(NULL, NULL, 1, 7),
(NULL, NULL, 1, 9),
(NULL, NULL, 1, 10),
(NULL, NULL, 1, 11),
(NULL, NULL, 1, 12),
(NULL, NULL, 1, 13),
(NULL, NULL, 1, 14),
(NULL, NULL, 1, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booked_time`
--
ALTER TABLE `booked_time`
  ADD PRIMARY KEY (`booked_time_id`),
  ADD KEY `FKqj3oonhgegrx0qlygu5lp7boa` (`student_id`),
  ADD KEY `FK97p2qsnen8moi15ufeouv3q2e` (`user_category_join_id`),
  ADD KEY `FKse65wojlrnettsv8i5xllu5ol` (`order_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_doctype`
--
ALTER TABLE `category_doctype`
  ADD KEY `FKdvys959wyudww282n8g4tp9nq` (`doc_types_doc_type_id`),
  ADD KEY `FK9hqa5wbckc1uvtdge9ipa1oxs` (`category_category_id`),
  ADD KEY `FK1h1glfdgurhnoq3ia50e4rfs3` (`categories_category_id`),
  ADD KEY `FKarjmxrlr7xcswtj3uxk6ronl` (`doc_type_doc_type_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `FKrpd7j1p7yxr784adkx4pyepba` (`country_id`);

--
-- Indexes for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD PRIMARY KEY (`token_id`),
  ADD KEY `FKah4p1rycwibwm6s9bsyeckq51` (`user_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `FK4hifl185j74sb56vsd8ot5nrg` (`doc_type_id`),
  ADD KEY `FKkxttj4tp5le2uth212lu49vny` (`user_id`),
  ADD KEY `FKj32uaf3qk1a1pnb08cef6ebhv` (`join_id`);

--
-- Indexes for table `doc_type`
--
ALTER TABLE `doc_type`
  ADD PRIMARY KEY (`doc_type_id`);

--
-- Indexes for table `gallery_picture`
--
ALTER TABLE `gallery_picture`
  ADD PRIMARY KEY (`gallery_picture_id`),
  ADD KEY `FKihwl86g0av0wefjn37t08wpg0` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `FKlouu98csyullos9k25tbpk4va` (`order_id`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`permission_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `FK23uc8oq3pshapbqbxxcnnohvj` (`user_category_join_id`);

--
-- Indexes for table `schedule_time`
--
ALTER TABLE `schedule_time`
  ADD PRIMARY KEY (`schedule_time_id`),
  ADD KEY `FKc4bc44ms6hw7piwumn3jjoh4r` (`schedule_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `FKruie73rneumyyd1bgo6qw8vjt` (`user_id`);

--
-- Indexes for table `sys_strings`
--
ALTER TABLE `sys_strings`
  ADD PRIMARY KEY (`string_id`);

--
-- Indexes for table `sys_string_translations`
--
ALTER TABLE `sys_string_translations`
  ADD PRIMARY KEY (`string_translation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `FKkpqrx37esphstf2tqxbt89avn` (`city_id`);

--
-- Indexes for table `user_category_join`
--
ALTER TABLE `user_category_join`
  ADD PRIMARY KEY (`join_id`),
  ADD KEY `FKtadheqs3n72qngoh05ugd45ka` (`category_id`),
  ADD KEY `FK8wmf1ed7er1gj2ykq9qgqhrxd` (`user_id`);

--
-- Indexes for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD KEY `FK560sjg2ckdpm8m0hdjat51qqo` (`users_user_id`),
  ADD KEY `FK5ggr942flsxti4c74iatsu0cy` (`permission_permission_id`),
  ADD KEY `FKfcq2tjt6oovxa0p5kllnk633i` (`permissions_permission_id`),
  ADD KEY `FKsfqtm1cd9heln4lox8ku5b2xn` (`user_user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booked_time`
--
ALTER TABLE `booked_time`
  MODIFY `booked_time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  MODIFY `token_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `doc_type`
--
ALTER TABLE `doc_type`
  MODIFY `doc_type_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `gallery_picture`
--
ALTER TABLE `gallery_picture`
  MODIFY `gallery_picture_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `permission_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `schedule_time`
--
ALTER TABLE `schedule_time`
  MODIFY `schedule_time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `sys_strings`
--
ALTER TABLE `sys_strings`
  MODIFY `string_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `sys_string_translations`
--
ALTER TABLE `sys_string_translations`
  MODIFY `string_translation_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user_category_join`
--
ALTER TABLE `user_category_join`
  MODIFY `join_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `booked_time`
--
ALTER TABLE `booked_time`
  ADD CONSTRAINT `FK97p2qsnen8moi15ufeouv3q2e` FOREIGN KEY (`user_category_join_id`) REFERENCES `user_category_join` (`join_id`),
  ADD CONSTRAINT `FKqj3oonhgegrx0qlygu5lp7boa` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKse65wojlrnettsv8i5xllu5ol` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `category_doctype`
--
ALTER TABLE `category_doctype`
  ADD CONSTRAINT `FK1h1glfdgurhnoq3ia50e4rfs3` FOREIGN KEY (`categories_category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `FK9hqa5wbckc1uvtdge9ipa1oxs` FOREIGN KEY (`category_category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `FKarjmxrlr7xcswtj3uxk6ronl` FOREIGN KEY (`doc_type_doc_type_id`) REFERENCES `doc_type` (`doc_type_id`),
  ADD CONSTRAINT `FKdvys959wyudww282n8g4tp9nq` FOREIGN KEY (`doc_types_doc_type_id`) REFERENCES `doc_type` (`doc_type_id`);

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `FKrpd7j1p7yxr784adkx4pyepba` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`);

--
-- Constraints for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  ADD CONSTRAINT `FKah4p1rycwibwm6s9bsyeckq51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `FK4hifl185j74sb56vsd8ot5nrg` FOREIGN KEY (`doc_type_id`) REFERENCES `doc_type` (`doc_type_id`),
  ADD CONSTRAINT `FKj32uaf3qk1a1pnb08cef6ebhv` FOREIGN KEY (`join_id`) REFERENCES `user_category_join` (`join_id`),
  ADD CONSTRAINT `FKkxttj4tp5le2uth212lu49vny` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `gallery_picture`
--
ALTER TABLE `gallery_picture`
  ADD CONSTRAINT `FKihwl86g0av0wefjn37t08wpg0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FKlouu98csyullos9k25tbpk4va` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `FK23uc8oq3pshapbqbxxcnnohvj` FOREIGN KEY (`user_category_join_id`) REFERENCES `user_category_join` (`join_id`);

--
-- Constraints for table `schedule_time`
--
ALTER TABLE `schedule_time`
  ADD CONSTRAINT `FKc4bc44ms6hw7piwumn3jjoh4r` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `FKruie73rneumyyd1bgo6qw8vjt` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKkpqrx37esphstf2tqxbt89avn` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`);

--
-- Constraints for table `user_category_join`
--
ALTER TABLE `user_category_join`
  ADD CONSTRAINT `FK8wmf1ed7er1gj2ykq9qgqhrxd` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKtadheqs3n72qngoh05ugd45ka` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `user_permission`
--
ALTER TABLE `user_permission`
  ADD CONSTRAINT `FK560sjg2ckdpm8m0hdjat51qqo` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FK5ggr942flsxti4c74iatsu0cy` FOREIGN KEY (`permission_permission_id`) REFERENCES `permission` (`permission_id`),
  ADD CONSTRAINT `FKfcq2tjt6oovxa0p5kllnk633i` FOREIGN KEY (`permissions_permission_id`) REFERENCES `permission` (`permission_id`),
  ADD CONSTRAINT `FKsfqtm1cd9heln4lox8ku5b2xn` FOREIGN KEY (`user_user_id`) REFERENCES `users` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
