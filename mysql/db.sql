-- MySQL dump 10.13  Distrib 8.4.13, for Linux (aarch64)
--
-- Host: localhost    Database: ipflDB
-- ------------------------------------------------------
-- Server version	8.4.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `iplpredict_picks`
--

DROP TABLE IF EXISTS `iplpredict_picks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iplpredict_picks` (
  `id` varchar(255) NOT NULL,
  `predictName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `season` int NOT NULL,
  `p1` int NOT NULL,
  `p2` int NOT NULL,
  `p3` int NOT NULL,
  `p4` int NOT NULL,
  `p5` int NOT NULL,
  `p6` int NOT NULL,
  `p7` int NOT NULL,
  `p8` int NOT NULL,
  `p9` int NOT NULL,
  `p10` int NOT NULL,
  `p11` int NOT NULL,
  `p12` int NOT NULL,
  `p13` int NOT NULL,
  `p14` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iplpredict_picks`
--

LOCK TABLES `iplpredict_picks` WRITE;
/*!40000 ALTER TABLE `iplpredict_picks` DISABLE KEYS */;
INSERT INTO `iplpredict_picks` VALUES ('0N8NZZFEYH','גכדג','דגכ','2026-11-11T09:20:06.401Z',2026,2,0,0,0,0,0,0,0,0,0,0,0,0,0),('P8JF11BX9H','df','sdfs','2026-11-11',2026,2,0,0,0,0,0,0,0,0,0,0,0,0,0);
/*!40000 ALTER TABLE `iplpredict_picks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iplpredict_teams`
--

DROP TABLE IF EXISTS `iplpredict_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iplpredict_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamName` varchar(255) NOT NULL,
  `pColor` varchar(255) NOT NULL,
  `sColor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iplpredict_teams`
--

LOCK TABLES `iplpredict_teams` WRITE;
/*!40000 ALTER TABLE `iplpredict_teams` DISABLE KEYS */;
INSERT INTO `iplpredict_teams` VALUES (1,'Maccabi Tel Aviv','#FFD700','#0038A8'),(2,'Maccabi Haifa','#00843D','#FFFFFF'),(3,'Hapoel Be\'er Sheva','#E30613','#FFFFFF'),(4,'Beitar Jerusalem','#FFD700','#000000'),(5,'Hapoel Tel Aviv','#E30613','#FFFFFF'),(6,'Hapoel Haifa','#E30613','#FFFFFF'),(7,'Hapoel Jerusalem','#E30613','#000000'),(8,'Hapoel Petah Tikva','#0055A4','#FFFFFF'),(9,'Maccabi Netanya','#FFD700','#000000'),(10,'Bnei Sakhnin','#E30613','#FFFFFF'),(11,'Ironi Kiryat Shmona','#0055A4','#FFFFFF'),(12,'Ironi Tiberias','#5BC2E7','#FFFFFF'),(13,'Maccabi Petah Tikva','#0055A4','#FFFFFF'),(14,'Hapoel Ramat Gan','#E30613','#FFFFFF');
/*!40000 ALTER TABLE `iplpredict_teams` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-13  2:13:57
