-- phpMyAdmin SQL Dump
-- version 4.6.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 16, 2017 at 03:45 PM
-- Server version: 5.7.12-log
-- PHP Version: 5.6.14

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
(4, b'1', '2017-03-17 15:20:47', '2017-03-17 14:20:47', 2, 1, 1),
(5, b'1', '2017-03-20 13:00:47', '2017-03-20 12:00:47', 2, 1, 1),
(6, b'1', '2017-03-27 13:00:18', '2017-03-27 12:00:18', 2, 1, 2),
(7, b'1', '2017-03-17 19:20:28', '2017-03-17 18:20:28', 2, 1, 3),
(8, b'1', '2017-03-22 13:00:28', '2017-03-22 12:00:28', 2, 1, 3),
(9, b'1', '2017-03-24 17:20:28', '2017-03-24 16:20:28', 2, 1, 3),
(10, b'1', '2017-03-17 13:30:34', '2017-03-17 12:30:34', 2, 3, 4),
(11, b'1', '2017-03-17 16:20:18', '2017-03-17 15:20:18', 2, 3, 5),
(12, b'1', '2017-03-20 09:20:05', '2017-03-20 08:00:05', 2, 6, 6),
(13, b'1', '2017-03-20 18:20:05', '2017-03-20 17:00:05', 2, 6, 6),
(14, b'1', '2017-03-20 14:20:29', '2017-03-20 13:00:29', 2, 6, 7);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `visible` bit(1) DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `uuid`, `active`, `date`, `visible`, `logo`) VALUES
(1, 'Math', '06fe4a1c-4a50-4da8-9f57-cddfc1bcea0e', b'1', '2017-03-07 06:13:09', b'0', 'f7fada4a-3ec9-4d0b-b66e-58dcd2ff178d'),
(2, 'Art History', '383a67ff-2a3d-4753-8d9a-bc56f207af5f', b'1', '2017-03-01 00:00:00', b'0', NULL),
(3, 'Chemistry', 'ba5ec7f5-372e-4ace-822c-543d2fd1dee3', b'1', '2017-03-07 13:51:30', b'0', NULL),
(4, 'Biology', 'a7b1ca70-3c2b-47ae-ab4e-a40280b55c66', b'1', '2017-03-07 13:53:08', b'0', NULL),
(5, 'English', '9d15f005-6a20-413b-924a-69619736baf2', b'1', '2017-03-07 13:53:13', b'0', NULL),
(6, 'Driving', '783fbc7c-bc69-430e-9296-594a4ee1902e', b'1', '2017-03-07 13:53:19', b'0', NULL),
(7, 'Beauty', '155ae1c8-6c3e-45a8-8a7c-b12acb477d96', b'1', '2017-03-07 13:53:23', b'0', NULL),
(8, 'Tennis', '0b23c40a-8fbb-4fdb-bfb9-12524b6ab58e', b'1', '2017-03-07 13:53:27', b'0', NULL),
(9, 'Skiing', 'd97e2d31-9fc4-4a28-aae4-b89c7b8ab621', b'1', '2017-03-07 13:53:30', b'0', 'c74f8866-ead9-4439-8dde-f8e3e4faef4b'),
(10, 'Swimming', 'ff150da1-6c1d-4567-ab2b-37ae47fa88d8', b'1', '2017-03-07 13:53:33', b'0', NULL),
(11, 'Dance', '13630334-1758-4fed-84ee-d5ab32ddb01a', b'1', '2017-03-07 13:53:37', b'0', NULL),
(12, 'Yoga', '74bcfae0-b1cf-4b20-9a56-d0103d3ab3ef', b'1', '2017-03-07 13:53:41', b'0', NULL),
(13, 'Piano', '836e7b91-899f-4649-ad99-bbefedc91be4', b'1', '2017-03-07 13:54:58', b'0', NULL),
(14, 'Violin', '5dd4b10c-001c-432f-a084-9c393c810f85', b'1', '2017-03-07 13:55:02', b'0', NULL),
(15, 'Georgian Literature', '65aef8e3-b969-4ec6-98c3-5aa9e9abf4b2', b'1', '2017-03-07 13:55:09', b'0', NULL),
(16, 'Chess', '5f73eab9-73ff-4192-8000-c75e4adc1da4', b'1', '2017-03-07 13:55:15', b'0', NULL),
(17, 'Coding', 'b59b9c17-6283-43b8-a86c-8ebc9fda848f', b'1', '2017-03-07 13:55:22', b'0', NULL),
(18, 'Standardized Tests', '055e8ff1-0c19-4693-b977-e1fa353a3b02', b'1', '2017-03-07 13:55:29', b'0', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category_doctype`
--

CREATE TABLE `category_doctype` (
  `category_category_id` bigint(20) NOT NULL,
  `doc_types_doc_type_id` bigint(20) NOT NULL,
  `doc_type_doc_type_id` bigint(20) DEFAULT NULL,
  `categories_category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `category_doctype`
--

INSERT INTO `category_doctype` (`category_category_id`, `doc_types_doc_type_id`, `doc_type_doc_type_id`, `categories_category_id`) VALUES
(5, 4, NULL, NULL),
(5, 5, NULL, NULL),
(2, 1, NULL, NULL),
(2, 2, NULL, NULL),
(2, 4, NULL, NULL),
(1, 1, NULL, NULL),
(1, 3, NULL, NULL);

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
(1, 'თბილისი', 1),
(2, 'ხაშური', 1),
(3, 'NY', 2),
(4, 'San Francisco', 2),
(5, 'Москва́', 3);

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
(1, 'საქართველო'),
(2, 'USA'),
(3, 'Росси́я');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` bigint(20) NOT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `join_id` bigint(20) DEFAULT NULL,
  `doc_type_id` bigint(20) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`document_id`, `extension`, `file_name`, `name`, `country_id`, `date`, `join_id`, `doc_type_id`, `active`, `user_id`) VALUES
(30, 'image/jpeg', '3a996959-41d2-4381-9195-93da22dd1fd0', '8VZ0E8f6LaY.jpg', 1, '2017-03-09 11:00:57', 1, 1, b'1', 1),
(31, 'image/jpeg', '53ee7133-551d-49d4-8e4f-121dc547be34', '1S5A3642.JPG', 1, '2017-03-10 13:40:10', 1, 1, b'1', 1),
(32, 'image/jpeg', 'ad229cad-6d31-4e12-8410-e25b0706d243', 'noPhoto.jpg', 1, '2017-03-10 13:41:42', 1, 1, b'1', 1),
(33, 'image/jpeg', '9b82a808-7114-4822-b250-5f96ba44069b', '0YxjreMH744.jpg', 1, '2017-03-10 16:02:55', 1, 2, b'1', 1),
(34, 'image/jpeg', 'ea02cc2b-0690-449a-9b11-75464a3a0f19', '1S5A3644.JPG', 1, '2017-03-10 16:11:16', 1, 1, b'1', 1),
(35, 'image/jpeg', 'fd738e67-8479-4d9c-97b7-11f6b889bf3d', '15171005_713489332136918_478295918073160058_n.jpg', 1, '2017-03-10 16:17:03', 1, 1, b'1', 1),
(36, 'image/jpeg', 'c5d2eb07-723e-4ab6-b22d-f4bbd713c0a7', '111.jpg', 1, '2017-03-10 16:17:07', 1, 1, b'1', 1),
(37, 'video/mp4', '5cbac1b5-e65a-43c4-983f-0b3acba1765b', '2RLGzcy.mp4', 1, '2017-03-10 16:32:06', 1, 1, b'1', 1),
(38, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '22aed062-91e3-47d8-89f6-278d6bd05099', 'მობილური აპლიკაციის კონცეფცია.pptx', 1, '2017-03-10 16:32:50', 1, 1, b'1', 1),
(39, 'application/x-zip-compressed', '3145bc09-bef2-46d3-8644-f128916b8dfd', 'jQuery-File-Upload-9.17.0.zip', 1, '2017-03-10 16:33:42', 1, 1, b'1', 1),
(40, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '399e74db-c30b-4241-950b-f03547246a22', 'Document1.docx', 1, '2017-03-10 16:34:42', 1, 1, b'1', 1),
(41, 'image/jpeg', '6d978f32-c6ea-4418-b11c-5376e80575e0', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:38', 1, 1, b'1', 1),
(42, 'image/jpeg', '11df8493-307b-4888-b242-56b5db9b27c0', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:41', 1, 1, b'1', 1),
(43, 'image/jpeg', '9ca1e377-a48e-4fb3-998c-d4ad5e6b730b', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:44', 1, 1, b'1', 1),
(44, 'image/jpeg', '53f4de88-0b70-4910-aa7b-64a2c825ddb1', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:47', 1, 1, b'1', 1),
(45, 'image/jpeg', '403d42c9-cb89-4440-812e-b71e7debebbf', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:50', 1, 1, b'1', 1),
(46, 'image/jpeg', 'fa2a9d26-9f0c-439c-a5e4-8dbf861aef6b', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:53', 1, 1, b'1', 1),
(47, 'image/jpeg', 'c5de9ec0-1a41-44bf-9f82-acfbb6926237', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:56', 1, 1, b'1', 1),
(48, 'image/jpeg', '95ab4914-c9b6-40e0-9a23-7bf37b11eb74', '0YxjreMH744.jpg', 1, '2017-03-10 16:38:59', 1, 1, b'1', 1),
(49, 'image/jpeg', 'a729ea0b-7f33-49ea-825d-8c4bb9ed10f0', '0YxjreMH744.jpg', 1, '2017-03-10 16:39:02', 1, 1, b'1', 1),
(50, 'image/jpeg', '1c31e8b9-9eb0-4266-a082-5761b6d44587', '0YxjreMH744.jpg', 1, '2017-03-10 16:39:05', 1, 1, b'1', 1),
(51, 'image/jpeg', '343c8210-75de-4700-940a-a76a9ba2349e', '2wDa4UrQADs.jpg', 1, '2017-03-10 16:40:58', 1, 1, b'1', 1),
(52, 'video/mp4', 'beb90b9c-48c0-4a05-b168-1b611522a005', '2RLGzcy.mp4', 1, '2017-03-10 16:41:05', 1, 1, b'1', 1),
(53, 'image/jpeg', 'd204e8fa-38f9-4a45-ab96-5b17db30fb84', '1S5A3632.JPG', NULL, '2017-03-10 17:02:48', 1, 1, b'1', 1),
(54, 'image/jpeg', '6d5de583-2bb4-48c2-981c-439bdcd73f56', '1S5A3619.JPG', NULL, '2017-03-11 14:33:44', 2, 2, b'1', 1),
(55, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'acfb86e4-03d0-4df8-a0de-0ee03bc5826c', 'daskvna.DOCX', NULL, '2017-03-11 14:40:36', 3, 3, b'1', 1),
(56, 'image/jpeg', '6605a93f-8734-41fd-b4ba-28cbca46bc13', '1S5A3617.JPG', NULL, '2017-03-11 19:05:44', 2, 1, b'1', 1),
(57, 'image/jpeg', 'e1a6c368-b110-430a-9a1c-22a4b00422c7', '1S5A3633.JPG', NULL, '2017-03-13 18:16:32', 5, 1, b'1', 2),
(58, 'image/jpeg', '1a69b150-a778-4979-ad84-39f9b6b97e64', '1S5A3619.JPG', NULL, '2017-03-16 13:35:05', 6, 4, b'1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `doc_type`
--

CREATE TABLE `doc_type` (
  `doc_type_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `doc_type`
--

INSERT INTO `doc_type` (`doc_type_id`, `name`, `uuid`, `active`, `date`) VALUES
(1, 'პირადობის მოწმობა', '91a3746a-a07f-4b66-adf9-70118c0af913', b'1', '2017-03-07 18:00:30'),
(2, 'მართვის მოწმობა', '5eee366a-b92a-4672-8e09-eff7470fa6b9', b'1', '2017-03-07 18:00:37'),
(3, 'ბაკალავრის დიპლომი', 'bb4afa13-3587-4399-98fd-ca06e2de7ca3', b'1', '2017-03-07 18:05:24'),
(4, 'ფსიხო', '87a046cf-7f80-4e5c-bc7a-3a4475989cbc', b'1', '2017-03-07 18:06:23'),
(5, 'IELTS სერთიფიკატი', '622aeba8-fb03-45b8-9990-2d57b4313929', b'1', '2017-03-07 18:06:42');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_picture`
--

CREATE TABLE `gallery_picture` (
  `gallery_picture_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `gallery_picture`
--

INSERT INTO `gallery_picture` (`gallery_picture_id`, `name`, `active`, `date`, `extension`, `user_id`) VALUES
(1, 'ad1338ac-b29b-47c3-8b18-52ce79c01486', b'1', '2017-03-11 14:20:47', 'image/jpeg', 1),
(2, 'cdef4df8-99ad-40c3-a10d-8c1aa1e97546', b'1', '2017-03-11 14:21:11', 'image/jpeg', 1),
(3, '58dd1cf0-9936-481d-9416-3621cff9cb03', b'1', '2017-03-11 14:30:40', 'image/jpeg', 1),
(4, 'f3c5b2f3-e410-4289-8807-ee5f43ddc356', b'1', '2017-03-11 14:30:53', 'image/jpeg', 1),
(5, 'b5b88f2c-112b-490c-badb-56476a747839', b'1', '2017-03-11 19:06:16', 'image/jpeg', 1),
(6, '95a0c180-4f0d-480f-842e-ce7d55c7fe6e', b'1', '2017-03-11 19:16:01', 'image/jpeg', 1),
(7, '778c1ab9-8936-4e7d-a13a-3f038b9f7813', b'1', '2017-03-16 13:34:01', 'image/jpeg', 1);

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
(1, b'1', NULL, b'0', '2017-03-16 18:07:57', '2017-03-16 18:07:57', b'0', '14ce5ab0-70c6-42d7-a3d2-a363fe6db034', 2, 40),
(2, b'1', NULL, b'0', '2017-03-16 18:09:36', '2017-03-16 18:09:36', b'0', 'e852be5b-af08-44a4-b9ac-11d9a4f164d7', 2, 20),
(3, b'1', NULL, b'0', '2017-03-16 18:23:29', '2017-03-16 18:23:29', b'0', 'bb238d5b-3495-4a47-95b2-019d736af385', 2, 60),
(4, b'1', NULL, b'0', '2017-03-16 18:31:06', '2017-03-16 18:31:06', b'0', '82f0fe41-9edc-44a3-a445-abce9cc38eed', 2, 22),
(5, b'1', NULL, b'0', '2017-03-16 18:31:21', '2017-03-16 18:31:21', b'0', 'b62859f3-8471-4db5-9824-7ada0f5925f9', 2, 22),
(6, b'1', NULL, b'0', '2017-03-16 18:33:17', '2017-03-16 18:33:17', b'0', '41246d13-47b5-4d0e-b207-8be185fa9696', 2, 60),
(7, b'1', NULL, b'0', '2017-03-16 18:34:42', '2017-03-16 18:34:42', b'0', '0dc0e665-868d-46f1-9046-d39626be3672', 2, 30);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `confirmed` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `price` float DEFAULT NULL,
  `transaction` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `active`, `confirm_date`, `confirmed`, `date`, `price`, `transaction`, `uuid`, `order_id`) VALUES
(1, b'1', NULL, b'0', '2017-03-16 18:07:57', 40, NULL, 'd816e2b7-19ad-4ab0-b053-f32d40d8cde7', 1),
(2, b'1', NULL, b'0', '2017-03-16 18:09:36', 20, NULL, '02b0de5d-1880-40d9-b409-f8c178d5ce66', 2),
(3, b'1', NULL, b'0', '2017-03-16 18:23:29', 60, NULL, 'd9c1c6f4-0bb5-4193-91b9-9c37c39d0f5b', 3),
(4, b'1', NULL, b'0', '2017-03-16 18:31:06', 22, NULL, 'f41aafb7-0d2f-4e9f-8aed-c6e48c7d11e0', 4),
(5, b'1', NULL, b'0', '2017-03-16 18:31:21', 22, NULL, 'c6b07c57-8fca-4ea5-b618-4ce8850822dc', 5),
(6, b'1', NULL, b'0', '2017-03-16 18:33:17', 60, NULL, 'c7971b10-2832-442c-bcd0-1216133df770', 6),
(7, b'1', NULL, b'0', '2017-03-16 18:34:42', 30, NULL, 'fea11e3f-f381-4764-a94e-ec1a4c661d59', 7);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `permission_id` bigint(20) NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `code` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`permission_id`, `name`, `code`) VALUES
(1, 'მომხმარებლების მართვა', 'users'),
(2, 'გადახდების სისტემა', 'payments'),
(3, 'დეშბორდი', 'dashboard'),
(4, 'test', 'test'),
(5, 'მასწავლებელი', 'teacher'),
(6, 'მოსწავლე', 'student'),
(7, 'ადმინისტრირება', 'admin'),
(8, 'დოკუმენტების მენეჯმენტი\r\n', 'fileManagement'),
(9, 'კატეგორიები', 'categories'),
(10, 'დოკუმენტის ტიპები', 'docTypes'),
(11, 'Gallery Management', 'gallery'),
(12, 'Schedule Management', 'scheduling'),
(13, 'Category Confirmation', 'categoryConfirmation');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` bigint(20) NOT NULL,
  `active` bit(1) DEFAULT NULL,
  `day_of_week` int(11) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `user_category_join_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `active`, `day_of_week`, `category_id`, `user_id`, `user_category_join_id`) VALUES
(1, b'1', 0, 1, 1, NULL),
(2, b'1', 2, 1, 1, NULL),
(3, b'1', 5, 1, 1, NULL),
(4, b'1', 4, 1, 1, NULL),
(5, b'1', 0, 4, 1, NULL),
(6, b'1', 1, 4, 1, NULL),
(7, b'1', 2, 4, 1, NULL),
(8, b'1', 0, 2, 1, NULL),
(9, b'1', 0, NULL, NULL, 1),
(10, b'1', 2, NULL, NULL, 1),
(11, b'1', 6, NULL, NULL, 1),
(12, b'1', 0, NULL, NULL, 2),
(13, b'1', 4, NULL, NULL, 3),
(14, b'1', 4, NULL, NULL, 4),
(15, b'1', 0, NULL, NULL, 6),
(16, b'1', 5, NULL, NULL, 6),
(17, b'1', 4, NULL, NULL, 1);

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
(15, b'1', '13:00:53', '12:00:53', 9),
(16, b'1', '18:00:14', '12:00:14', 10),
(17, b'1', '17:00:37', '09:30:37', 11),
(18, b'1', '21:40:02', '14:20:02', 17),
(19, b'1', '20:00:00', '08:00:00', 15),
(20, b'1', '22:50:58', '12:30:58', 13);

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
(1, '2017-02-28 13:30:06', b'0', 1),
(2, '2017-02-28 13:30:38', b'0', 1),
(3, '2017-02-28 14:28:08', b'0', 1),
(4, '2017-03-02 10:29:49', b'1', 2),
(5, '2017-03-02 10:32:59', b'1', 1),
(6, '2017-03-02 14:15:40', b'0', 1),
(7, '2017-03-02 14:17:26', b'1', 1),
(8, '2017-03-02 14:18:46', b'0', 1),
(9, '2017-03-02 14:34:18', b'0', 1),
(10, '2017-03-02 14:34:33', b'0', 1),
(11, '2017-03-02 14:39:02', b'1', 1),
(12, '2017-03-14 09:56:18', b'1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `address` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL,
  `mobile` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  `personal_number` varchar(255) COLLATE utf8_bin NOT NULL,
  `surname` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_bin NOT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `profile_pic` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `confirmed_email` bit(1) DEFAULT NULL,
  `confirmedsms` bit(1) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `address`, `email`, `mobile`, `name`, `password`, `personal_number`, `surname`, `type`, `username`, `city_id`, `profile_pic`, `birth_date`, `confirmed_email`, `confirmedsms`, `sex`) VALUES
(1, '1', '1', '1', 'კახა', '1', '01005022890', 'გელაშვილი', 1, 'sa', 1, '75b0cb61-a82e-4c91-a76a-3a5a78df0a90', NULL, b'1', b'1', 1),
(2, '1', 'gio@gmail.com', '1', 'გიორგი', '1', '1', 'დემეტრაშვილი', 0, 'gio', 2, NULL, NULL, b'1', b'1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_category_join`
--

CREATE TABLE `user_category_join` (
  `join_id` bigint(20) NOT NULL,
  `accepted` bit(1) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `declined` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `duration` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_category_join`
--

INSERT INTO `user_category_join` (`join_id`, `accepted`, `category_id`, `user_id`, `declined`, `date`, `last_modify_date`, `active`, `price`, `duration`) VALUES
(1, b'1', 1, 1, b'0', NULL, '2017-03-13 13:53:46', b'1', 20, 60),
(2, b'0', 2, 1, b'0', NULL, NULL, b'1', 20, 55),
(3, b'0', 3, 1, b'0', NULL, NULL, b'1', 22, 60),
(4, b'0', 5, 1, b'0', NULL, NULL, b'1', 22, 55),
(5, b'0', 1, 2, b'0', '2017-03-13 18:02:55', '2017-03-13 18:02:55', b'1', 22, 40),
(6, b'1', 11, 1, b'0', '2017-03-16 13:34:38', '2017-03-16 13:35:31', b'1', 30, 80),
(7, b'0', 6, 1, b'0', '2017-03-16 16:31:38', '2017-03-16 16:31:38', b'1', 25, 40);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

CREATE TABLE `user_permission` (
  `permission_permission_id` bigint(20) DEFAULT NULL,
  `users_user_id` bigint(20) DEFAULT NULL,
  `user_user_id` bigint(20) NOT NULL,
  `permissions_permission_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`permission_permission_id`, `users_user_id`, `user_user_id`, `permissions_permission_id`) VALUES
(NULL, NULL, 2, 6),
(NULL, NULL, 1, 1),
(NULL, NULL, 1, 2),
(NULL, NULL, 1, 7),
(NULL, NULL, 1, 5),
(NULL, NULL, 1, 6),
(NULL, NULL, 1, 8),
(NULL, NULL, 1, 3),
(NULL, NULL, 1, 9),
(NULL, NULL, 1, 10),
(NULL, NULL, 1, 11),
(NULL, NULL, 1, 12),
(NULL, NULL, 1, 13);

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
  ADD KEY `FKaus3bpsgv40qtjcxkbbjnuqov` (`country_id`),
  ADD KEY `FKj32uaf3qk1a1pnb08cef6ebhv` (`join_id`),
  ADD KEY `FK4hifl185j74sb56vsd8ot5nrg` (`doc_type_id`),
  ADD KEY `FKkxttj4tp5le2uth212lu49vny` (`user_id`);

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
  ADD KEY `FKk5g6ob1cuyemily9khimje9jv` (`category_id`),
  ADD KEY `FKdn5svbxyacce1gpfiawk7iqtc` (`user_id`),
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
  MODIFY `booked_time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `confirmation_token`
--
ALTER TABLE `confirmation_token`
  MODIFY `token_id` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `document_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `doc_type`
--
ALTER TABLE `doc_type`
  MODIFY `doc_type_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `gallery_picture`
--
ALTER TABLE `gallery_picture`
  MODIFY `gallery_picture_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `permission_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `schedule_time`
--
ALTER TABLE `schedule_time`
  MODIFY `schedule_time_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `session_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_category_join`
--
ALTER TABLE `user_category_join`
  MODIFY `join_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
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
  ADD CONSTRAINT `FKaus3bpsgv40qtjcxkbbjnuqov` FOREIGN KEY (`country_id`) REFERENCES `users` (`user_id`),
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
  ADD CONSTRAINT `FK23uc8oq3pshapbqbxxcnnohvj` FOREIGN KEY (`user_category_join_id`) REFERENCES `user_category_join` (`join_id`),
  ADD CONSTRAINT `FKdn5svbxyacce1gpfiawk7iqtc` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKk5g6ob1cuyemily9khimje9jv` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

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
