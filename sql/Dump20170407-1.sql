-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: teacherportal
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booked_time`
--

DROP TABLE IF EXISTS `booked_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booked_time` (
  `booked_time_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `user_category_join_id` bigint(20) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`booked_time_id`),
  KEY `FKqj3oonhgegrx0qlygu5lp7boa` (`student_id`),
  KEY `FK97p2qsnen8moi15ufeouv3q2e` (`user_category_join_id`),
  KEY `FKse65wojlrnettsv8i5xllu5ol` (`order_id`),
  CONSTRAINT `FK97p2qsnen8moi15ufeouv3q2e` FOREIGN KEY (`user_category_join_id`) REFERENCES `user_category_join` (`join_id`),
  CONSTRAINT `FKqj3oonhgegrx0qlygu5lp7boa` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKse65wojlrnettsv8i5xllu5ol` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booked_time`
--

LOCK TABLES `booked_time` WRITE;
/*!40000 ALTER TABLE `booked_time` DISABLE KEYS */;
INSERT INTO `booked_time` VALUES (1,'','2017-03-20 19:00:00','2017-03-20 18:00:00',2,1,NULL),(2,'','2017-03-20 19:30:00','2017-03-20 19:10:00',2,1,NULL),(3,'\0','2017-03-20 13:00:12','2017-03-20 12:00:12',2,1,1),(4,'\0','2017-03-22 13:00:12','2017-03-22 12:00:12',2,1,1),(5,'\0','2017-03-29 11:00:12','2017-03-29 10:00:12',2,1,1),(6,'\0','2017-03-18 09:40:06','2017-03-18 09:00:06',2,2,2),(7,'\0','2017-03-20 13:40:06','2017-03-20 13:00:06',2,2,2),(8,'\0','2017-03-25 10:20:06','2017-03-25 09:40:06',2,2,2),(9,'\0','2017-03-29 10:00:14','2017-03-29 09:00:14',2,1,3),(10,'\0','2017-03-29 19:50:14','2017-03-29 18:50:14',2,1,3),(11,'\0','2017-03-29 13:00:23','2017-03-29 12:00:23',2,1,4),(12,'\0','2017-04-03 13:00:23','2017-04-03 12:00:23',2,1,4),(13,'\0','2017-03-29 19:50:16','2017-03-29 18:50:16',2,1,5),(14,'\0','2017-03-29 20:50:16','2017-03-29 19:50:16',2,1,5),(15,'\0','2017-03-30 14:00:26','2017-03-30 13:00:26',2,1,6),(16,'\0','2017-03-30 16:00:14','2017-03-30 15:00:14',2,1,7),(17,'\0','2017-03-30 18:00:12','2017-03-30 17:00:12',2,1,8),(18,'\0','2017-04-06 12:00:16','2017-04-06 11:00:16',2,1,9),(19,'\0','2017-04-06 14:00:38','2017-04-06 13:00:00',2,1,10),(20,'\0','2017-04-06 15:00:36','2017-04-06 14:00:00',2,1,11),(21,'\0','2017-03-30 19:00:48','2017-03-30 18:00:00',2,1,12),(22,'\0','2017-04-05 10:00:00','2017-04-05 09:00:00',2,1,13),(23,'\0','2017-03-27 18:00:00','2017-03-27 17:00:00',2,1,14),(24,'\0','2017-03-27 19:00:00','2017-03-27 18:00:00',2,1,15),(25,'\0','2017-04-06 17:00:00','2017-04-06 16:00:00',2,1,16),(26,'\0','2017-04-01 10:20:00','2017-04-01 09:40:00',2,2,17),(27,'\0','2017-04-01 18:05:00','2017-04-01 17:25:00',2,2,17),(28,'\0','2017-04-03 14:40:00','2017-04-03 14:00:00',2,2,17),(29,'\0','2017-04-08 12:20:00','2017-04-08 11:40:00',2,2,17),(30,'\0','2017-04-10 13:20:00','2017-04-10 12:40:00',2,2,17),(31,'\0','2017-04-15 12:20:00','2017-04-15 11:40:00',2,2,17),(32,'\0','2017-03-29 12:00:00','2017-03-29 11:00:00',2,1,18),(33,'\0','2017-03-30 15:00:00','2017-03-30 14:00:00',2,1,18),(34,'\0','2017-04-05 11:00:00','2017-04-05 10:00:00',2,1,18),(35,'\0','2017-04-06 18:00:00','2017-04-06 17:00:00',2,1,18),(36,'\0','2017-03-27 13:00:00','2017-03-27 12:00:00',2,1,19),(37,'\0','2017-03-27 14:00:00','2017-03-27 13:00:00',2,1,19),(38,'','2017-03-29 19:50:00','2017-03-29 18:50:00',2,1,20),(39,'','2017-03-29 21:50:00','2017-03-29 20:50:00',2,1,20),(40,'','2017-03-29 22:50:00','2017-03-29 21:50:00',2,1,20),(41,'','2017-03-30 15:00:00','2017-03-30 14:00:00',2,1,20),(42,'','2017-03-30 18:00:00','2017-03-30 17:00:00',2,1,20),(43,'','2017-03-30 19:00:00','2017-03-30 18:00:00',2,1,20);
/*!40000 ALTER TABLE `booked_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `visible` bit(1) DEFAULT NULL,
  `lang` int(11) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'','2017-03-14 22:22:58',NULL,'Math','09d73849-2281-46ba-aa67-f5bda5f7eb5b','\0',0),(2,'','2017-03-16 20:18:41','390f4db4-b56a-4723-9dfa-fa2a79b33e57','Art','1182e3d1-8c60-4425-ab61-895d7d16378d','',0),(3,'','2017-04-05 12:33:41','377183cf-14be-49b2-a7da-ce937aeb515b','Biology','7383b8da-3f45-41ca-bb84-084894fa1c86','',0),(4,'','2017-04-05 12:34:02','bb6c3435-18bf-4141-8e35-5af4351ddd11','Sport','55634178-a6d9-4c02-aaa7-6b8d3d92db9f','',0),(5,'','2017-04-05 12:34:12','35ce639a-1cf0-49de-be8c-571b1fa11505','Design','53970302-4bc1-4c1c-918f-611f8be6d3ed','',0),(6,'','2017-04-05 12:34:28','fa6cbed4-521f-4a34-a94f-3d134e8af0d4','Driving','2bd3201f-eb5b-47a5-9eff-302d60f549ff','',0),(7,'','2017-04-05 12:34:48','77f913f9-a0b6-47e0-89a6-676d12b0b508','Skami','b7e5cee2-2109-42f7-b8cc-ffe6b431ede7','',0);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_doctype`
--

DROP TABLE IF EXISTS `category_doctype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_doctype` (
  `category_category_id` bigint(20) DEFAULT NULL,
  `doc_types_doc_type_id` bigint(20) DEFAULT NULL,
  `doc_type_doc_type_id` bigint(20) DEFAULT NULL,
  `categories_category_id` bigint(20) DEFAULT NULL,
  KEY `FKdvys959wyudww282n8g4tp9nq` (`doc_types_doc_type_id`),
  KEY `FK9hqa5wbckc1uvtdge9ipa1oxs` (`category_category_id`),
  KEY `FK1h1glfdgurhnoq3ia50e4rfs3` (`categories_category_id`),
  KEY `FKarjmxrlr7xcswtj3uxk6ronl` (`doc_type_doc_type_id`),
  CONSTRAINT `FK1h1glfdgurhnoq3ia50e4rfs3` FOREIGN KEY (`categories_category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FK9hqa5wbckc1uvtdge9ipa1oxs` FOREIGN KEY (`category_category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `FKarjmxrlr7xcswtj3uxk6ronl` FOREIGN KEY (`doc_type_doc_type_id`) REFERENCES `doc_type` (`doc_type_id`),
  CONSTRAINT `FKdvys959wyudww282n8g4tp9nq` FOREIGN KEY (`doc_types_doc_type_id`) REFERENCES `doc_type` (`doc_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_doctype`
--

LOCK TABLES `category_doctype` WRITE;
/*!40000 ALTER TABLE `category_doctype` DISABLE KEYS */;
INSERT INTO `category_doctype` VALUES (1,1,NULL,NULL),(1,2,NULL,NULL),(2,1,NULL,NULL),(2,2,NULL,NULL),(2,3,NULL,NULL);
/*!40000 ALTER TABLE `category_doctype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `city_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `country_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `FKrpd7j1p7yxr784adkx4pyepba` (`country_id`),
  CONSTRAINT `FKrpd7j1p7yxr784adkx4pyepba` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Tbilis',1);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmation_token`
--

DROP TABLE IF EXISTS `confirmation_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `confirmation_token` (
  `token_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `confimed` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `confirmation_date` datetime DEFAULT NULL,
  `mail_for_confirmation` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `FKah4p1rycwibwm6s9bsyeckq51` (`user_id`),
  CONSTRAINT `FKah4p1rycwibwm6s9bsyeckq51` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmation_token`
--

LOCK TABLES `confirmation_token` WRITE;
/*!40000 ALTER TABLE `confirmation_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `confirmation_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `country_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Georgia');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_type`
--

DROP TABLE IF EXISTS `doc_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doc_type` (
  `doc_type_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`doc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_type`
--

LOCK TABLES `doc_type` WRITE;
/*!40000 ALTER TABLE `doc_type` DISABLE KEYS */;
INSERT INTO `doc_type` VALUES (1,'','2017-03-14 22:23:07','ID','63e19291-571f-48ca-ae99-a90192c51c20'),(2,'','2017-03-14 22:23:14','Diploma','277ffc67-8d4a-4e5a-921a-e3b8c5e2e889'),(3,'','2017-03-16 20:21:26','prava','5edacaef-bf54-428a-b3f4-d0f74960ca89');
/*!40000 ALTER TABLE `doc_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `document_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `doc_type_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `join_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `FK4hifl185j74sb56vsd8ot5nrg` (`doc_type_id`),
  KEY `FKkxttj4tp5le2uth212lu49vny` (`user_id`),
  KEY `FKj32uaf3qk1a1pnb08cef6ebhv` (`join_id`),
  CONSTRAINT `FK4hifl185j74sb56vsd8ot5nrg` FOREIGN KEY (`doc_type_id`) REFERENCES `doc_type` (`doc_type_id`),
  CONSTRAINT `FKj32uaf3qk1a1pnb08cef6ebhv` FOREIGN KEY (`join_id`) REFERENCES `user_category_join` (`join_id`),
  CONSTRAINT `FKkxttj4tp5le2uth212lu49vny` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,'','2017-03-15 22:53:14','application/zip','ce0e0be8-0dda-4eaa-803e-c4de02230da6','About Downloads.lpdf.zip',2,1,1);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery_picture`
--

DROP TABLE IF EXISTS `gallery_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery_picture` (
  `gallery_picture_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `extension` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`gallery_picture_id`),
  KEY `FKihwl86g0av0wefjn37t08wpg0` (`user_id`),
  CONSTRAINT `FKihwl86g0av0wefjn37t08wpg0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_picture`
--

LOCK TABLES `gallery_picture` WRITE;
/*!40000 ALTER TABLE `gallery_picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `confirmed` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `refunded` bit(1) DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'\0',NULL,'\0','2017-03-16 20:17:56','2017-03-26 12:24:14','\0','38ffa1c6-542a-4877-8816-d2c510d41996',2,60),(2,'\0',NULL,'\0','2017-03-16 20:26:17','2017-03-26 12:24:14','\0','09a69a7b-41bd-401d-88f2-0f8867f418d1',2,120),(3,'\0',NULL,'\0','2017-03-23 00:44:27','2017-03-26 12:24:14','\0','2c866036-671f-4574-b15c-b1e67e5c9539',2,40),(4,'\0',NULL,'\0','2017-03-23 01:06:15','2017-03-26 12:24:14','\0','ca7fef5a-2e6e-4511-9df2-3f8eee64c444',2,40),(5,'\0',NULL,'\0','2017-03-23 22:16:25','2017-03-26 12:24:14','\0','f063a6c7-e916-4343-a2d3-d6e7735f6bde',2,40),(6,'\0',NULL,'\0','2017-03-23 23:22:36','2017-03-26 12:24:14','\0','2d8e696a-b986-4e17-a793-db87f3acb17a',2,20),(7,'\0',NULL,'\0','2017-03-23 23:24:24','2017-03-26 12:24:14','\0','7337e7a5-e03c-44bd-8f63-2b10cad6a254',2,20),(8,'\0',NULL,'\0','2017-03-23 23:25:59','2017-03-26 12:24:14','\0','38f5cb78-d6cc-43d1-a761-97f6cc4bd8a0',2,20),(9,'\0',NULL,'\0','2017-03-23 23:26:52','2017-03-26 12:24:14','\0','d7de2471-78b2-4968-988e-a88336d39df5',2,20),(10,'\0',NULL,'\0','2017-03-23 23:29:52','2017-03-26 12:24:14','\0','e598dbe7-3899-407d-bbd7-ad631f7dc4e3',2,20),(11,'\0',NULL,'\0','2017-03-23 23:30:54','2017-03-26 12:24:14','\0','0c94a050-ecd8-470c-a476-cadd37e33a58',2,20),(12,'\0',NULL,'\0','2017-03-23 23:34:00','2017-03-26 12:24:14','\0','8a1a56b1-ceca-41ec-9ef2-afbbb2ec3d01',2,20),(13,'\0',NULL,'\0','2017-03-23 23:38:14','2017-03-26 12:24:14','\0','6f28893e-3249-4d09-b5c3-fba61b1717b8',2,20),(14,'\0',NULL,'\0','2017-03-23 23:46:07','2017-03-26 12:24:14','\0','b786dd29-422c-4e4b-9672-238cc147cfd0',2,20),(15,'\0',NULL,'\0','2017-03-23 23:55:17','2017-03-26 12:24:14','\0','c5d13d16-05bf-44a0-add4-0dfe83420269',2,20),(16,'\0',NULL,'\0','2017-03-26 01:34:09','2017-03-26 12:24:14','\0','6426247d-fbc0-4e9f-bb6d-a07bbfc3f24e',2,20),(17,'\0',NULL,'\0','2017-03-26 01:55:17','2017-03-26 12:24:14','\0','597a8aa6-cfd9-49fe-a2cd-7b68e37f01d5',2,240),(18,'\0',NULL,'\0','2017-03-26 14:00:22','2017-03-26 16:22:31','\0','00fdde0b-54a8-431d-baa0-df4cb5c864ac',2,80),(19,'\0',NULL,'\0','2017-03-26 23:16:38','2017-03-26 23:31:39','\0','109bac85-e908-443f-b43a-9c22f7bedfa2',2,40),(20,'',NULL,'\0','2017-03-29 15:40:07','2017-03-29 15:40:07','\0','aaa211a2-ac1e-4e33-a514-58623fb0c344',2,120);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `confirmed` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `price` float DEFAULT NULL,
  `transaction` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `FKlouu98csyullos9k25tbpk4va` (`order_id`),
  CONSTRAINT `FKlouu98csyullos9k25tbpk4va` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'\0','2017-03-16 20:17:56',60,NULL,'7e4dfd62-435f-4a1c-8281-0305381c7919','',NULL,1),(2,'\0','2017-03-16 20:26:17',120,NULL,'a50176a7-1827-4fd3-ad0a-bf861e7c3629','',NULL,2),(3,'\0','2017-03-23 00:44:27',40,NULL,'766ee48e-1d8f-4c0b-8fce-694606a9a979','',NULL,3),(4,'\0','2017-03-23 01:06:15',40,NULL,'203bd33b-b66c-4f8d-943c-36089118a4a6','',NULL,4),(5,'\0','2017-03-23 22:16:26',40,NULL,'f92741eb-c016-4b1b-9c3a-ca2b94ac9a45','',NULL,5),(6,'\0','2017-03-23 23:22:36',20,NULL,'39fe0247-e7b2-4c02-95e5-17227dc074e1','',NULL,6),(7,'\0','2017-03-23 23:24:24',20,NULL,'8496fc99-f479-4068-89f9-7dc96150534d','',NULL,7),(8,'\0','2017-03-23 23:25:59',20,NULL,'df6f325b-25f6-4790-b37f-fff13778ec8c','',NULL,8),(9,'\0','2017-03-23 23:26:52',20,NULL,'a395e4d0-d732-492b-8285-433d1780259a','',NULL,9),(10,'\0','2017-03-23 23:29:52',20,NULL,'5f606f97-d60a-46c8-b68b-431dadc3f3e1','',NULL,10),(11,'\0','2017-03-23 23:30:54',20,NULL,'0869a19b-53cc-4788-b3ca-81ebd4be4652','',NULL,11),(12,'\0','2017-03-23 23:34:00',20,NULL,'d84d932c-1ddc-446a-bb4c-f75173aa2e11','',NULL,12),(13,'\0','2017-03-23 23:38:14',20,NULL,'40d14913-f0ce-40aa-ac44-910660b6f120','',NULL,13),(14,'\0','2017-03-23 23:46:07',20,NULL,'7168d258-94fc-42b4-a9ce-f5423e533972','',NULL,14),(15,'\0','2017-03-23 23:55:17',20,NULL,'4e51b3c1-50fb-4779-85e3-d58bdac51f99','',NULL,15),(16,'\0','2017-03-26 01:34:09',20,NULL,'14b257f1-dd02-415d-bffd-4e4227e35c9d','',NULL,16),(17,'\0','2017-03-26 01:55:17',240,NULL,'f29c3a90-8c2d-4917-8cdf-755cf1e06f5f','',NULL,17),(18,'\0','2017-03-26 14:00:22',80,NULL,'04c2c5f9-40d1-4410-859d-888acf8d1361','',NULL,18),(19,'\0','2017-03-26 23:16:38',40,NULL,'6ad1ddf8-161e-4f7e-a614-6487e6eac77c','',NULL,19),(20,'\0','2017-03-29 15:40:07',120,NULL,'0d50a764-f49e-40ba-91f4-450f39845b64','',NULL,20);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `permission_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_bin NOT NULL,
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'categoryConfirmation','categoryConfirmation'),(2,'users','users'),(3,'payments','payments'),(4,'dashboard','dashboard'),(5,'test','test'),(6,'teacher','teacher'),(7,'student','student'),(8,'admin','admin'),(9,'fileManagement','fileManagement'),(10,'categories','categories'),(11,'docTypes','docTypes'),(12,'gallery','gallery'),(13,'scheduling','scheduling'),(14,'orders','Orders'),(15,'strings','App Strings');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule` (
  `schedule_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `day_of_week` int(11) DEFAULT NULL,
  `user_category_join_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `FK23uc8oq3pshapbqbxxcnnohvj` (`user_category_join_id`),
  CONSTRAINT `FK23uc8oq3pshapbqbxxcnnohvj` FOREIGN KEY (`user_category_join_id`) REFERENCES `user_category_join` (`join_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,'',0,1),(2,'',2,1),(3,'',5,1),(4,'',0,2),(5,'',5,2),(6,'',1,1),(7,'',3,1);
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_time`
--

DROP TABLE IF EXISTS `schedule_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schedule_time` (
  `schedule_time_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `schedule_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`schedule_time_id`),
  KEY `FKc4bc44ms6hw7piwumn3jjoh4r` (`schedule_id`),
  CONSTRAINT `FKc4bc44ms6hw7piwumn3jjoh4r` FOREIGN KEY (`schedule_id`) REFERENCES `schedule` (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_time`
--

LOCK TABLES `schedule_time` WRITE;
/*!40000 ALTER TABLE `schedule_time` DISABLE KEYS */;
INSERT INTO `schedule_time` VALUES (1,'','14:30:36','12:00:36',1),(2,'','20:00:31','17:00:31',1),(3,'','22:55:21','18:50:21',2),(4,'','14:30:35','09:00:35',2),(5,'','16:00:14','12:00:14',4),(6,'','14:00:09','09:00:09',5),(7,'','19:25:51','17:25:51',5),(8,'','19:30:58','10:00:58',7);
/*!40000 ALTER TABLE `schedule_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `isactive` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`session_id`),
  KEY `FKruie73rneumyyd1bgo6qw8vjt` (`user_id`),
  CONSTRAINT `FKruie73rneumyyd1bgo6qw8vjt` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (1,'2017-03-14 22:17:28','',1),(2,'2017-03-14 22:29:42','\0',1),(3,'2017-03-21 01:13:02','\0',1),(4,'2017-03-21 01:14:04','',1),(5,'2017-03-21 01:14:37','',1),(6,'2017-03-30 13:02:56','\0',1),(7,'2017-04-04 12:06:31','\0',1),(8,'2017-04-04 12:07:11','\0',1),(9,'2017-04-04 12:09:29','\0',1),(10,'2017-04-04 15:44:25','\0',1),(11,'2017-04-05 12:28:36','\0',1),(12,'2017-04-05 13:39:27','\0',1),(13,'2017-04-07 14:58:47','',1);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_string_translations`
--

DROP TABLE IF EXISTS `sys_string_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_string_translations` (
  `string_translation_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `lang` int(11) DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`string_translation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_string_translations`
--

LOCK TABLES `sys_string_translations` WRITE;
/*!40000 ALTER TABLE `sys_string_translations` DISABLE KEYS */;
INSERT INTO `sys_string_translations` VALUES (1,'',2,'793bde7c-0239-4ae1-ab28-b2f05fe5c20d','დამატება'),(2,'',2,'ad5811e9-e070-488b-86ac-501dc69c8005','მომხმარებლის დამატება'),(3,'',2,'7383b8da-3f45-41ca-bb84-084894fa1c86','ბიოლოგია'),(4,'',2,'1182e3d1-8c60-4425-ab61-895d7d16378d','ხელოვნება'),(5,'',2,'53970302-4bc1-4c1c-918f-611f8be6d3ed','დიზაინი'),(6,'',2,'2bd3201f-eb5b-47a5-9eff-302d60f549ff','მართვის მოწმობა'),(7,'',2,'09d73849-2281-46ba-aa67-f5bda5f7eb5b','მათემატიკა'),(8,'',2,'b7e5cee2-2109-42f7-b8cc-ffe6b431ede7','სკამი'),(9,'',2,'55634178-a6d9-4c02-aaa7-6b8d3d92db9f','სპორტი'),(10,'',2,'1d3a3526-74a3-4476-84fb-ff0e69e508a6','კატეგორია'),(11,'',2,'5357e078-40a4-4562-b9fe-18336df9265c','ქალაქი'),(12,'',2,'c6b2568a-cb4d-403c-8f45-022da3082898','პაროლი'),(13,'',2,'3e061d85-1510-4be9-b60f-a04311931e14','სახელი'),(14,'',2,'f6de5d6b-63cb-40cb-9002-22e9bd24980e','ენა'),(15,'',2,'f2c20da7-c439-4daa-81f3-c146b2f6ccc0','ელ. ფოსტა'),(16,'',2,'e0c94e37-ad39-4835-bbf3-317b83ebe9a5','გამოსაყენებელი კალენდარი'),(17,'',2,'c2015486-2bd2-4233-83eb-4f78762261e3','კალენდარი'),(18,'',2,'967ae0b7-c550-4268-ada9-69fa02b5e24b','სახელი'),(19,'',2,'db961189-abc1-4f44-abc5-3bf51fda39e1','გახდი მასწავლებელი'),(20,'',2,'a71cfc40-f5af-4e6a-a57a-38c6f8a33db0','კალენდარი'),(21,'',2,'158e6758-27e8-4e97-82fa-022bd2681aff','ელ. ფოსტა'),(22,'',2,'dccc419a-77a8-46f3-823c-71b27d6aba02','ენა'),(23,'',2,'0d6a1692-ccfa-41f4-9b43-3c01d3488bf3','გვარი'),(24,'',2,'250eefdf-a3c3-45b6-b095-d8569da5354c','ავტორიზაცია/რეგისტრაცია'),(25,'',2,'ad4e0166-fed2-4fd6-86e1-eaf7bf14b919','გამოსვლა'),(26,'',2,'ee4a5a96-625c-4042-8e75-bbb0af8c1015','პროფილი'),(27,'',2,'40e91fcb-8b5b-4115-8b0e-b30764cd7f2a','პარამეტრები'),(28,'',2,'1f4802b4-5f3d-41b8-a27f-289271149373','შენახვა'),(29,'',2,'13cb2c40-1529-4565-983e-55229b39dd6b','გაუქმება');
/*!40000 ALTER TABLE `sys_string_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_strings`
--

DROP TABLE IF EXISTS `sys_strings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_strings` (
  `string_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `value` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`string_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_strings`
--

LOCK TABLES `sys_strings` WRITE;
/*!40000 ALTER TABLE `sys_strings` DISABLE KEYS */;
INSERT INTO `sys_strings` VALUES (1,'','2017-03-26 22:48:35','admin_header','8b3e2963-f0b4-4d0d-903f-1db1899f6e6f','Management System'),(2,'','2017-03-26 22:48:54','admin_search_filed_value','279f4a35-372d-48ee-b822-ccf8c56a5335','Search...'),(3,'','2017-03-26 22:49:25','admin_menu_users','5ef155e3-5c16-43c8-845f-43bdeb541f98','Users'),(4,'','2017-03-26 22:50:39','admin_menu_dashboard','41b33009-fbee-498f-85d5-1822a43b3a0c','Dashboard'),(5,'','2017-03-26 22:51:00','admin_menu_categories','eae2abd1-dbef-41e4-9438-54fe88ef4436','Categories'),(6,'','2017-03-26 22:51:18','admin_menu_orders','b92f508f-4552-425c-969d-bac33c30723a','Orders'),(7,'','2017-03-26 22:51:37','admin_menu_strings','0705bf7c-ef18-4cfb-baac-f7c21dee126a','Strings'),(8,'','2017-03-26 22:52:01','admin_button_add','793bde7c-0239-4ae1-ab28-b2f05fe5c20d','Add'),(9,'','2017-03-26 22:52:19','admin_header_hello','98e8614a-77a9-49a3-9b02-e205b66421ea','Hello'),(10,'','2017-03-26 22:52:45','admin_button_newuser','ad5811e9-e070-488b-86ac-501dc69c8005','Add User'),(11,'','2017-03-26 22:53:47','admin_tab_documents','73dfdd67-5eab-420f-97ba-3e7713afd310','Documents'),(12,'','2017-03-26 22:54:03','admin_tab_permissions','3556a713-64ee-43be-a487-b712b0b33211','Permissions'),(13,'','2017-03-26 22:54:16','admin_button_save','1f4802b4-5f3d-41b8-a27f-289271149373','Save'),(14,'','2017-03-26 22:54:49','admin_button_cancele','13cb2c40-1529-4565-983e-55229b39dd6b','Cancel'),(15,'','2017-03-26 22:55:16','admin_tab_classes','84319993-b22b-4c44-935b-4a220041d5ed','Classes'),(16,'','2017-03-26 22:55:36','admin_tab_categories','43a0668c-e932-478a-bc00-520d476cf284','Categories'),(17,'','2017-03-26 22:56:03','admin_tab_actions','1d49148d-b449-425d-8e2f-25fff8c5b8bd','Actions'),(18,'','2017-03-26 22:56:13','admin_tab_info','406d9deb-f299-4a31-8e32-e8e86f139e8e','Info'),(19,'','2017-03-26 22:56:41','admin_button_upload','d7975293-6ab5-448f-93dc-e590435e424c','Upload'),(20,'','2017-03-26 22:56:59','admin_tab_gallery','03215fdb-5daf-434d-aa12-bd1c13064565','Gallery'),(21,'','2017-03-26 22:57:36','admin_label_user_permissions','6cd7a064-069d-4553-acb3-fec86b015001','User Permissions'),(22,'','2017-03-26 22:57:54','admin_label_permissions_to_add','47420b53-e112-4b53-94ab-ca09a6b7b2d9','Permissions To Add'),(23,'','2017-03-26 22:58:23','admin_button_add_category','3bb3091a-8aa9-4251-9325-27d8ea1271a4','Add Category'),(24,'','2017-03-26 22:59:11','admin_label_category','a7aa9331-54b4-43e5-aaf1-8aef023d8c28','Category'),(25,'','2017-03-26 22:59:25','admin_label_price','7ccfc2fd-f1e1-4c92-aece-743c7e8449ca','Price'),(26,'','2017-03-26 22:59:38','admin_label_duration','fa18b31e-bec3-4e2c-bb9d-a86d5765f25e','Duration'),(27,'','2017-03-26 23:00:53','admin_tab_schedule','0f187908-1429-4045-afc5-b047c98b6201','Schedule'),(28,'','2017-03-26 23:01:13','admin_label_day','4f9c613a-01c8-4694-91e0-510513e83650','Day'),(29,'','2017-03-26 23:01:36','admin_label_working_hours','be1e6ec0-b86f-4e8f-9876-bcbf5334ea52','Working Hours'),(30,'','2017-03-26 23:15:35','admin_button_schedule_lesson','e12dee29-7e2f-4019-ad0e-20f7c39be2d4','Schedule Lesson'),(31,'','2017-03-26 23:16:04','admin_button_book','fa85be1f-1e86-4fcf-8967-3ab370f21bff','Book'),(32,'','2017-03-26 23:17:04','admin_button_pay_now','58b7eb5e-abba-4b47-aaab-e3feb1ecc757','Pay Now'),(33,'','2017-03-26 23:17:18','admin_label_name','1e072b38-750e-463c-b991-e674c2a2699c','Name'),(34,'','2017-03-26 23:17:30','admin_label_value','bdf17256-7243-4f40-818b-133585c22dd2','Value'),(35,'','2017-03-26 23:17:48','admin_label_status','41c923d3-afb2-4a6b-8ebb-12a920165c7f','Status'),(36,'','2017-03-26 23:18:55','admin_label_teacher','631d3c9e-1904-49a8-9ebf-97db14220c9b','Teacher'),(37,'','2017-03-26 23:19:04','admin_label_student','e8b05078-819d-49f8-8f70-9633c5c58306','Student'),(38,'','2017-03-26 23:19:23','admin_label_ordered_times','d02d762b-fdbe-4737-9684-00e0d0770f26','Ordered Times'),(39,'','2017-03-26 23:19:33','admin_label_date','c6aba998-b87d-44a4-ba01-34595adde4d8','Date'),(40,'','2017-03-26 23:19:42','admin_label_from','83e9bdf4-b122-461f-8a39-6dc0db598ed1','From'),(41,'','2017-03-26 23:19:50','admin_label_to','938b2e9d-a9a4-4eeb-b29a-729a54811228','to'),(42,'','2017-03-26 23:20:12','admin_label_paid','53ae8ec7-f277-44d5-b5ac-79e171a7e1cb','Paid'),(43,'','2017-03-26 23:20:23','admin_label_not_paid','b73add1c-32e9-4130-a29b-9644883af030','Not Paid'),(44,'','2017-03-26 23:21:16','admin_combobox_label_all_categories','dbf57077-2103-43d4-af1a-507e2d39dfd2','All Categories'),(45,'','2017-03-26 23:21:27','admin_label_all','c36a1228-5a66-4841-9c00-6568069c7d81','All'),(46,'','2017-03-26 23:22:13','admin_label_contact','3acfa49c-651c-48ea-954a-1c2b5fc865f4','Contact'),(47,'','2017-03-26 23:22:37','admin_label_user_agreement','91f69521-53aa-4c5b-bf66-d5a34ad23c64','User Agreement'),(48,'','2017-03-26 23:22:49','admin_label_about_us','47e43b0c-3c35-4536-9d07-3e7cda0bcabf','About Us'),(49,'','2017-03-28 22:17:19','admin_label_surname','9d9752d5-b9ed-4539-9bb9-6d8de657a611','Surname'),(50,'','2017-03-28 22:18:34','admin_label_username','34df5470-d35f-4399-90f9-f0e23f3f479c','Username'),(51,'','2017-03-28 22:18:52','admin_label_personal_number','08bd8319-243a-4500-8a65-6b1b22ecd9cf','Personal Number'),(52,'','2017-03-28 22:19:10','admin_label_pn','555ab4bc-c4d8-4260-a51a-fd8041117cc6','P/N'),(53,'','2017-03-28 22:19:48','admin_label_phone','5e2b5088-c584-438d-94dd-d7fcea70a2c0','Phone'),(54,'','2017-03-28 22:19:55','admin_label_mobile','908b2a18-8dd4-457f-a433-8de2d19682c5','Mobile'),(55,'','2017-03-28 22:21:30','admin_label_action','e1001d29-d6f0-452a-a2fd-6ec448d09910','Action'),(56,'','2017-03-28 22:23:48','admin_button_doctypes','e6fde1c4-b4bc-4f29-885d-2181963661b4','Document Types'),(57,'','2017-03-28 22:24:38','admin_button_add_new_doc_type','217994cf-f636-4883-a2a9-456cd763775f','Add New Document Type'),(58,'','2017-03-28 22:26:30','admin_label_document_types','b72ec675-7f43-43c8-bcaf-14f5599c1248','Document Types'),(59,'','2017-03-28 22:29:39','admin_label_required_document_types','12e17c4a-404f-486e-8764-bdc75e58a244','Required Document Types'),(60,'','2017-03-28 22:30:43','admin_label_types_to_add','3c902a04-058c-44ba-bd5d-95ae26ec475c','Types To Add'),(61,'','2017-03-28 22:33:46','admin_label_start_time','d252751c-d981-40a1-b2b6-e8bed0315806','Start Time'),(62,'','2017-03-28 22:33:59','admin_label_end_time','809e631a-8b04-426f-a031-4f6e84541b01','End Time'),(63,'','2017-03-28 22:35:32','admin_button_book_lesson','7aca3b17-27ca-4320-a6cb-f26847d5fbb3','Book Lesson'),(64,'','2017-03-28 22:38:40','admin_tab_scheduled_lessons','1a24d5da-d12a-49f3-ab61-6a739083f490','Scheduled Lessons'),(65,'','2017-03-28 22:41:14','admin_label_weekday','963e5274-2c78-4cac-a3f7-9342ab1daabe','Weekday'),(66,'','2017-03-29 00:10:22','admin_label_sum','6e2659df-e303-4c8b-b510-4acbbcd3db1f','Sum'),(67,'','2017-03-29 00:14:51','admin_label_work_hours','413b0e9f-c054-46b3-8ed3-23532212bd5d','Work Hours'),(68,'','2017-03-29 11:48:30','admin_label_categories','a78eb6c1-55e3-41d4-84f8-c2bb6b7d1553','Categories'),(69,'','2017-03-29 11:49:31','admin_label_teacher_pn','a0ab9555-3e2b-4cb6-9772-e6cc722d91c2','Teacher P.N'),(70,'','2017-03-29 11:49:45','admin_label_student_pn','b501eb22-eae3-47d5-9e2a-f76eadb224d7','Student P.N'),(71,'','2017-03-29 11:55:50','admin_label_city','0c69ba74-ca8f-42fe-9ea4-68e3ad157322','City'),(72,'','2017-03-29 11:56:43','admin_label_email','40a7bebb-3eb2-4d28-8c5c-d04b0f3ccd1f','Email'),(73,'','2017-03-29 11:57:23','admin_label_password','bd83774c-f0cc-4aa3-b471-67b5a6ee05b5','Password'),(74,'','2017-03-29 11:59:21','admin_label_address','97e400d9-cdc4-4074-b16b-3741d48e1a82','Address'),(75,'','2017-04-04 12:06:56','main_become_a_teacher','db961189-abc1-4f44-abc5-3bf51fda39e1','Become A Teacher'),(76,'','2017-04-04 12:07:31','main_login_signup','250eefdf-a3c3-45b6-b095-d8569da5354c','Login/Sign Up'),(77,'','2017-04-07 11:27:43','admin_label_lang','db0965fa-ced2-417f-9676-99a48ad57631','Lang'),(78,'','2017-04-07 12:50:43','admin_tab_teachers','8e11081d-12b1-4164-aefc-6d991a39a60c','Teachers'),(79,'','2017-04-07 12:51:20','admin_tab_translations','af39e5cb-56f9-4ccd-8cde-39244ab7c8cb','Translations'),(80,'','2017-04-07 15:23:37','main_search_placeholder_category','1d3a3526-74a3-4476-84fb-ff0e69e508a6','Category'),(81,'','2017-04-07 15:23:51','main_search_placeholder_city','5357e078-40a4-4562-b9fe-18336df9265c','City'),(82,'','2017-04-07 15:25:20','main_settings_field_name','3e061d85-1510-4be9-b60f-a04311931e14','Name'),(83,'','2017-04-07 15:26:20','main_settings_field_email','f2c20da7-c439-4daa-81f3-c146b2f6ccc0','Email'),(84,'','2017-04-07 15:26:29','main_settings_field_password','c6b2568a-cb4d-403c-8f45-022da3082898','Password'),(85,'','2017-04-07 15:26:47','main_settings_field_language','f6de5d6b-63cb-40cb-9002-22e9bd24980e','Language'),(86,'','2017-04-07 15:27:00','main_settings_field_facebook','ee5792dc-5312-4ad7-b424-bd9bc84d3634','Facebook'),(87,'','2017-04-07 15:27:08','main_settings_field_google','f183debc-c563-46ff-8b1d-11836bdef60a','Google'),(88,'','2017-04-07 15:27:17','main_settings_field_calendar','c2015486-2bd2-4233-83eb-4f78762261e3','Calendar'),(89,'','2017-04-07 15:27:35','main_settings_field_calendar_to_use','e0c94e37-ad39-4835-bbf3-317b83ebe9a5','Calendar To Use'),(90,'','2017-04-07 15:31:11','man_label_name','967ae0b7-c550-4268-ada9-69fa02b5e24b','Name'),(91,'','2017-04-07 15:31:19','main_label_surname','0d6a1692-ccfa-41f4-9b43-3c01d3488bf3','Surname'),(92,'','2017-04-07 15:31:39','main_label_lang','dccc419a-77a8-46f3-823c-71b27d6aba02','Language'),(93,'','2017-04-07 15:32:07','main_label_email','158e6758-27e8-4e97-82fa-022bd2681aff','Email'),(94,'','2017-04-07 15:32:22','main_label_facebook','a7a58832-3d65-4c2f-94ca-8c9cf42c3d24','Facebook'),(95,'','2017-04-07 15:32:36','main_label_google','337bdb03-e644-4664-8a74-7cba95f52b49','Google'),(96,'','2017-04-07 15:33:02','main_label_calendar','a71cfc40-f5af-4e6a-a57a-38c6f8a33db0','Calendar'),(97,'','2017-04-07 15:37:29','main_menu_profile','ee4a5a96-625c-4042-8e75-bbb0af8c1015','Profile'),(98,'','2017-04-07 15:37:40','main_menu_settings','40e91fcb-8b5b-4115-8b0e-b30764cd7f2a','Settings'),(99,'','2017-04-07 15:37:59','main_menu_log_out','ad4e0166-fed2-4fd6-86e1-eaf7bf14b919','Log Out');
/*!40000 ALTER TABLE `sys_strings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_category_join`
--

DROP TABLE IF EXISTS `user_category_join`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_category_join` (
  `join_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `accepted` bit(1) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `declined` bit(1) DEFAULT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  PRIMARY KEY (`join_id`),
  KEY `FKtadheqs3n72qngoh05ugd45ka` (`category_id`),
  KEY `FK8wmf1ed7er1gj2ykq9qgqhrxd` (`user_id`),
  CONSTRAINT `FK8wmf1ed7er1gj2ykq9qgqhrxd` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKtadheqs3n72qngoh05ugd45ka` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_category_join`
--

LOCK TABLES `user_category_join` WRITE;
/*!40000 ALTER TABLE `user_category_join` DISABLE KEYS */;
INSERT INTO `user_category_join` VALUES (1,'','','2017-03-15 00:43:49','\0','2017-03-15 01:38:45',1,1,20,60),(2,'','','2017-03-16 20:21:56','\0','2017-03-16 20:22:08',2,1,40,40);
/*!40000 ALTER TABLE `user_category_join` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_permission` (
  `permission_permission_id` bigint(20) DEFAULT NULL,
  `users_user_id` bigint(20) DEFAULT NULL,
  `user_user_id` bigint(20) DEFAULT NULL,
  `permissions_permission_id` bigint(20) DEFAULT NULL,
  KEY `FK560sjg2ckdpm8m0hdjat51qqo` (`users_user_id`),
  KEY `FK5ggr942flsxti4c74iatsu0cy` (`permission_permission_id`),
  KEY `FKfcq2tjt6oovxa0p5kllnk633i` (`permissions_permission_id`),
  KEY `FKsfqtm1cd9heln4lox8ku5b2xn` (`user_user_id`),
  CONSTRAINT `FK560sjg2ckdpm8m0hdjat51qqo` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FK5ggr942flsxti4c74iatsu0cy` FOREIGN KEY (`permission_permission_id`) REFERENCES `permission` (`permission_id`),
  CONSTRAINT `FKfcq2tjt6oovxa0p5kllnk633i` FOREIGN KEY (`permissions_permission_id`) REFERENCES `permission` (`permission_id`),
  CONSTRAINT `FKsfqtm1cd9heln4lox8ku5b2xn` FOREIGN KEY (`user_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_permission`
--

LOCK TABLES `user_permission` WRITE;
/*!40000 ALTER TABLE `user_permission` DISABLE KEYS */;
INSERT INTO `user_permission` VALUES (NULL,NULL,2,7),(NULL,NULL,1,8),(NULL,NULL,1,2),(NULL,NULL,1,1),(NULL,NULL,1,3),(NULL,NULL,1,4),(NULL,NULL,1,5),(NULL,NULL,1,6),(NULL,NULL,1,7),(NULL,NULL,1,9),(NULL,NULL,1,10),(NULL,NULL,1,11),(NULL,NULL,1,12),(NULL,NULL,1,13),(NULL,NULL,1,14),(NULL,NULL,1,15);
/*!40000 ALTER TABLE `user_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
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
  `calendar_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `language` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKkpqrx37esphstf2tqxbt89avn` (`city_id`),
  CONSTRAINT `FKkpqrx37esphstf2tqxbt89avn` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1','1993-08-15 00:00:00','','','kaxgel11@gmail.com','577344094','kakha','1','01005022890','693f7a94-af26-46d2-ae83-b5ba6cada2f9',1,'Gelashvili',1,'sa',1,'','','102815771802216742694','1/igg4dpacvn9pRhIi3KndT47-i0sqwIRK8LZBuOUDx3zqMFlPIoTEPgE9c1D5SZuy','kaxgel11@gmail.com',2),(2,'მიქატაძის 37','1993-08-15 00:00:00','','','1','558226969','ნიკა','1','01005',NULL,1,'გარუჩავა',1,'nika',1,'','','','','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-07 15:44:26
