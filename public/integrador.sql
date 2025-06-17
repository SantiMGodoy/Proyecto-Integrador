-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: integrador
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alas`
--

DROP TABLE IF EXISTS `alas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alas`
--

LOCK TABLES `alas` WRITE;
/*!40000 ALTER TABLE `alas` DISABLE KEYS */;
INSERT INTO `alas` VALUES (1,'Ala Norte','2025-06-13 15:19:20','2025-06-13 15:19:20'),(2,'Ala Sur','2025-06-13 15:19:20','2025-06-13 15:19:20'),(3,'Ala Este','2025-06-13 15:19:20','2025-06-13 15:19:20'),(4,'Ala Oeste','2025-06-13 15:19:20','2025-06-13 15:19:20'),(5,'Ala Central','2025-06-13 15:19:20','2025-06-13 15:19:20');
/*!40000 ALTER TABLE `alas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camas`
--

DROP TABLE IF EXISTS `camas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `sexoOcupante` varchar(255) DEFAULT NULL,
  `HabitacionId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `higienizada` tinyint(1) DEFAULT '1',
  `PacienteId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Camas_PacienteId_foreign_idx` (`PacienteId`),
  CONSTRAINT `Camas_PacienteId_foreign_idx` FOREIGN KEY (`PacienteId`) REFERENCES `pacientes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camas`
--

LOCK TABLES `camas` WRITE;
/*!40000 ALTER TABLE `camas` DISABLE KEYS */;
INSERT INTO `camas` VALUES (1,'1','libre',NULL,1,'2025-06-13 15:19:20','2025-06-16 19:30:59',1,NULL),(2,'2','libre',NULL,1,'2025-06-13 15:19:20','2025-06-16 19:31:00',1,NULL),(3,'1','libre',NULL,2,'2025-06-13 15:19:20','2025-06-16 19:31:01',1,NULL),(4,'2','libre',NULL,2,'2025-06-13 15:19:20','2025-06-16 19:31:02',1,NULL),(5,'1','libre',NULL,3,'2025-06-13 15:19:20','2025-06-16 19:31:04',1,NULL),(6,'2','libre',NULL,3,'2025-06-13 15:19:20','2025-06-16 19:32:05',1,NULL),(7,'1','libre',NULL,4,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL),(8,'1','libre',NULL,5,'2025-06-13 15:19:20','2025-06-16 19:32:06',1,NULL),(9,'2','libre',NULL,5,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL),(10,'1','libre',NULL,6,'2025-06-13 15:19:20','2025-06-16 19:32:08',1,NULL),(11,'2','libre',NULL,6,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL),(12,'1','libre',NULL,7,'2025-06-13 15:19:20','2025-06-13 15:28:24',1,NULL),(13,'1','libre',NULL,8,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL),(14,'1','libre',NULL,9,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL),(15,'1','libre',NULL,10,'2025-06-13 15:19:20','2025-06-13 15:19:20',1,NULL);
/*!40000 ALTER TABLE `camas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacionenfermeria`
--

DROP TABLE IF EXISTS `evaluacionenfermeria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacionenfermeria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PacienteId` int DEFAULT NULL,
  `internacionId` int DEFAULT NULL,
  `enfermedadesPrevias` text,
  `cirugias` text,
  `alergias` text,
  `medicacionActual` text,
  `antecedentesFamiliares` text,
  `motivoInternacion` text,
  `sintomas` text,
  `presion` text,
  `frecuenciaCardiaca` varchar(255) DEFAULT NULL,
  `frecuenciaRespiratoria` varchar(255) DEFAULT NULL,
  `temperatura` varchar(255) DEFAULT NULL,
  `planCuidados` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacionenfermeria`
--

LOCK TABLES `evaluacionenfermeria` WRITE;
/*!40000 ALTER TABLE `evaluacionenfermeria` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacionenfermeria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluacionmedicas`
--

DROP TABLE IF EXISTS `evaluacionmedicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluacionmedicas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PacienteId` int DEFAULT NULL,
  `internacionId` int DEFAULT NULL,
  `diagnostico` text,
  `tratamientos` text,
  `medicacion` text,
  `estudiosSolicitados` text,
  `observaciones` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluacionmedicas`
--

LOCK TABLES `evaluacionmedicas` WRITE;
/*!40000 ALTER TABLE `evaluacionmedicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluacionmedicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacions`
--

DROP TABLE IF EXISTS `habitacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(255) DEFAULT NULL,
  `cantidadCamas` int DEFAULT NULL,
  `AlaId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tipo` varchar(255) NOT NULL DEFAULT 'Consulta',
  `requiereInternacion` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacions`
--

LOCK TABLES `habitacions` WRITE;
/*!40000 ALTER TABLE `habitacions` DISABLE KEYS */;
INSERT INTO `habitacions` VALUES (1,'101',2,1,'2025-06-13 15:19:20','2025-06-13 15:19:20','consulta',0),(2,'102',2,1,'2025-06-13 15:19:20','2025-06-13 15:19:20','consulta',0),(3,'201',2,2,'2025-06-13 15:19:20','2025-06-13 15:19:20','pediatria',0),(4,'202',1,2,'2025-06-13 15:19:20','2025-06-13 15:19:20','pediatria',0),(5,'301',2,3,'2025-06-13 15:19:20','2025-06-13 15:19:20','cirugia',1),(6,'302',2,3,'2025-06-13 15:19:20','2025-06-13 15:19:20','cirugia',1),(7,'401',1,4,'2025-06-13 15:19:20','2025-06-13 15:19:20','cuidados intensivos',1),(8,'402',1,4,'2025-06-13 15:19:20','2025-06-13 15:19:20','cuidados intensivos',1),(9,'501',1,5,'2025-06-13 15:19:20','2025-06-13 15:19:20','clinica medica',1),(10,'502',1,5,'2025-06-13 15:19:20','2025-06-13 15:19:20','clinica medica',1);
/*!40000 ALTER TABLE `habitacions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internacions`
--

DROP TABLE IF EXISTS `internacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internacions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `PacienteId` int DEFAULT NULL,
  `CamaId` int DEFAULT NULL,
  `fechaIngreso` datetime DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fechaAlta` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internacions`
--

LOCK TABLES `internacions` WRITE;
/*!40000 ALTER TABLE `internacions` DISABLE KEYS */;
INSERT INTO `internacions` VALUES (1,1,12,'2025-06-13 15:19:37','finalizada','2025-06-13 15:19:37','2025-06-13 15:19:42',NULL),(2,2,8,'2025-06-14 16:47:23','finalizada','2025-06-14 16:47:23','2025-06-16 12:27:55',NULL),(3,2,10,'2025-06-16 12:29:26','finalizada','2025-06-16 12:29:26','2025-06-16 12:30:43',NULL);
/*!40000 ALTER TABLE `internacions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `fechaNacimiento` datetime DEFAULT NULL,
  `sexo` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `obraSocial` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `viaIngreso` varchar(255) DEFAULT NULL,
  `medicoDerivante` varchar(255) DEFAULT NULL,
  `motivoIngreso` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Juan Pérez','12345678','1980-05-10 00:00:00','M','1133445566','Calle Falsa 123','OSDE','2025-06-13 15:19:20','2025-06-13 15:19:20','programada',NULL,'Control general'),(2,'Ana López','23456789','1990-07-22 00:00:00','F','1122334455','Av. Siempre Viva 742','IOMA','2025-06-13 15:19:20','2025-06-13 15:19:20','derivacion','Dr. Carlos Ruiz','Dolor abdominal'),(3,'Paciente de Prueba','99999999','1970-01-01 00:00:00','X','0000000000','Desconocida','Sin cobertura','2025-06-13 15:19:20','2025-06-13 15:19:20','programada',NULL,'Chequeo');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 19:59:35
